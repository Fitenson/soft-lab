<?php

namespace backend\modules\client_database\data\repository;

use Yii;
use Throwable;
use backend\components\repository\BaseRepository;
use backend\modules\client_database\domain\entity\ClientDatabaseEntity;
use backend\modules\client_database\domain\repository\ClientDatabaseRepository;
use backend\modules\client_database\data\models\ClientDatabase;
use backend\modules\client_database\data\dto\ClientDatabaseDTO;
use backend\modules\client_database\data\dto\ClientDatabaseTableDTO;
use backend\modules\client_database\data\models\ClientDatabaseHasRefreshToken;


class YiiClientDatabaseRepository extends BaseRepository implements ClientDatabaseRepository {
    public function index()
    {
        $query = ClientDatabase::find()->selectIndex();

        $total = $query->count();

        $ClientDatabases = $query
        ->asArray()
        ->all();

        return [
            'total' => $total,
            'rows' => $ClientDatabases
        ];
    }


    public function create(ClientDatabaseEntity $clientDatabaseEntity): ClientDatabaseEntity
    {
        $_actionUUID = $this->getActionUUID();

        $clientDatabaseDTO = $clientDatabaseEntity->asDTO();
        $ClientDatabase = new ClientDatabase();
        $ClientDatabase->load($clientDatabaseDTO->getAttributes(), '');
        $ClientDatabase->_actionUUID = $_actionUUID;

        if(!$ClientDatabase->save(false)) {
            Yii::$app->exception->throw($ClientDatabase->getErrors(), 500);
        }

        $ClientDatabaseHasRefreshToken = new ClientDatabaseHasRefreshToken();
        $ClientDatabaseHasRefreshToken->clientDatabase = $ClientDatabase->UUID;
        $ClientDatabaseHasRefreshToken->user = Yii::$app->user->id;
        $ClientDatabaseHasRefreshToken->expiresAt = strtotime("+1 week");
        $ClientDatabaseHasRefreshToken->_actionUUID = $_actionUUID;
        $ClientDatabaseHasRefreshToken->generateRefreshToken();
        $ClientDatabaseHasRefreshToken->save(false);

        return new ClientDatabaseEntity($ClientDatabase->getAttributes());
    }
    

    public function update(ClientDatabaseEntity $clientDatabaseEntity): ClientDatabaseEntity
    {
        $_actionUUID = $this->getActionUUID();

        $clientDatabaseDTO = $clientDatabaseEntity->asDTO();
        $ClientDatabase = ClientDatabase::findOne($clientDatabaseDTO->UUID);
        $ClientDatabase->load($clientDatabaseDTO->getAttributes(), '');
        $ClientDatabase->_actionUUID = $_actionUUID;

        if(!$ClientDatabase->save(false)) {
            Yii::$app->exception->throw($ClientDatabase->getErrors(), 500);
        }

        return new ClientDatabaseEntity($ClientDatabase->getAttributes());        
    }


    public function view(string $id, string $refreshToken): ClientDatabaseEntity
    {
        $ClientDatabaseHasRefreshToken = ClientDatabaseHasRefreshToken::findOne([
            'clientDatabase' => $id,
            'user' => Yii::$app->user->id
        ]);

        if(!$ClientDatabaseHasRefreshToken->validateRefreshToken($refreshToken)) {
            Yii::$app->exception->throw('Unauthorized user', 422);
        }

        $ClientDatabase = ClientDatabase::findOne($id);

        return new ClientDatabaseEntity($ClientDatabase->getAttributes());
    }


    public function remove(array $data): array
    {
        $_actionUUID = $this->getActionUUID();
        $status = [
            'success' => [],
            'failed' => []
        ];

        $UUIDs = $data['UUIDs'];
        $ClientDatabases = ClientDatabase::find()->where(['UUID' => $UUIDs])->all();

        foreach($ClientDatabases as $ClientDatabase) {
            try {
                $transaction = Yii::$app->db->beginTransaction();
                $ClientDatabase->_actionUUID = $_actionUUID;
                $ClientDatabase->delete();
                $transaction->commit();

                $clientDatabaseDTO = new ClientDatabaseDTO();
                $clientDatabaseDTO->load($ClientDatabase->getAttributes(), '');
                $status['success'][] = $clientDatabaseDTO;
            } catch(Throwable $error) {
                $transaction->rollBack();

                $clientDatabaseDTO = new ClientDatabaseDTO();
                $clientDatabaseDTO->load($ClientDatabase->getAttributes(), '');
                $status['failed'][] = $clientDatabaseDTO;
                $status['failed']['message'] = $error->getMessage();
            }
        }

        return $status;        
    }


    public function generateRefreshToken(string $id)
    {
        $ClientDatabaseHasRefreshToken = ClientDatabaseHasRefreshToken::findOne([
            'clientDatabase' => $id,
            'user' => Yii::$app->user->id
        ]);

        if(empty($ClientDatabaseHasRefreshToken)) {
            Yii::$app->exception->throw('Unauthorized user', 422);
        }

        $token = $ClientDatabaseHasRefreshToken->generateRefreshToken();
        $ClientDatabaseHasRefreshToken->saveQuietly(false);

        return $token;
    }


    public function connect(array $params): ClientDatabaseEntity
    {
        $refreshToken = $params['refreshToken'];

        $ClientDatabaseHasRefreshToken = ClientDatabaseHasRefreshToken::findOne([
            'refreshToken' => $refreshToken,
            'user' => Yii::$app->user->id
        ]);

        $ClientDatabase = ClientDatabase::findOne($ClientDatabaseHasRefreshToken->clientDatabase);

        return new ClientDatabaseEntity($ClientDatabase->getAttributes());        
    }

    public function findById(string $id): ClientDatabaseEntity
    {
        $ClientDatabaseHasRefreshToken = ClientDatabaseHasRefreshToken::findOne([
            'clientDatabase' => $id,
            'user' => Yii::$app->user->id
        ]);

        $ClientDatabase = ClientDatabase::findOne($ClientDatabaseHasRefreshToken->clientDatabase);
        return new ClientDatabaseEntity($ClientDatabase->getAttributes());
    }


    public function findByRefreshToken(string $refreshToken): ClientDatabaseEntity
    {
        $ClientDatabaseHasRefreshToken = ClientDatabaseHasRefreshToken::findOne([
            'refreshToken' => $refreshToken,
            'user' => Yii::$app->user->id
        ]);

        $ClientDatabase = ClientDatabase::findOne($ClientDatabaseHasRefreshToken->clientDatabase);
        return new ClientDatabaseEntity($ClientDatabase->getAttributes());
    }


    public function loginClientDatabase(string $id, $password): ClientDatabaseEntity
    {
        $ClientDatabase = ClientDatabase::findOne($id);

        if($ClientDatabase->validatePassword($password)) {
            Yii::$app->exception->throw('Incorrect password', 422);
        }

        return new ClientDatabaseEntity($ClientDatabase->getAttributes());
    }


    public function getClientTable(array $params, string $refreshToken): array
    {
        $clientDatabaseEntity = $this->findByRefreshToken($refreshToken);

        return Yii::$app->clientDatabase->connect($clientDatabaseEntity, function ($db) {
            // Get all table names
            $tables = $db->createCommand('SHOW TABLES')->queryColumn();

            $structure = [];

            foreach ($tables as $tableName) {
                // Get detailed structure for each table
                $columns = $db->createCommand("SHOW FULL COLUMNS FROM `{$tableName}`")->queryAll();
            
                // Convert keys to camelCase for each column
                $columnsCamelCase = array_map(function ($column) {
                    $newColumn = [];
                    foreach ($column as $key => $value) {
                        $camelKey = lcfirst(str_replace(' ', '', ucwords(str_replace(['_', '-'], ' ', $key))));
                        $newColumn[$camelKey] = $value;
                    }
                    return $newColumn;
                }, $columns);
            
                $structure[] = [
                    'table' => $tableName,
                    'columns' => $columnsCamelCase,
                ];
            }


            return $structure;
        });
    }


    public function getClientTableList(array $params, string $refreshToken): array
    {
        $clientDatabaseEntity = $this->findByRefreshToken($refreshToken);

        return Yii::$app->clientDatabase->connect($clientDatabaseEntity, function ($db) use ($params) {
            // Extract pagination + filter params with defaults
            $offset = isset($params['offset']) ? (int)$params['offset'] : 0;
            $limit = isset($params['limit']) ? (int)$params['limit'] : 10;
            $filter = isset($params['filter']) ? trim($params['filter']) : '';

            $tables = $db->createCommand('SHOW TABLES')->queryColumn();
        
            if (!empty($filter)) {
                $tables = array_filter($tables, function ($tableName) use ($filter) {
                    return stripos($tableName, $filter) !== false;
                });
            }

            // Get total count before pagination
            $total = count($tables);
            $pagedTables = array_slice($tables, $offset, $limit);

            // Return structured data
            return [
                'total' => $total,
                'rows' => array_map(fn($t) => ['table' => $t], $pagedTables),
            ];
        });
    }
}
