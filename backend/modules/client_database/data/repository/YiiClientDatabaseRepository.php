<?php

namespace backend\modules\client_database\data\repository;

use Yii;
use Throwable;
use backend\components\repository\BaseRepository;
use backend\modules\client_database\domain\entity\ClientDatabaseEntity;
use backend\modules\client_database\domain\repository\ClientDatabaseRepository;
use backend\modules\client_database\data\models\ClientDatabase;
use backend\modules\client_database\data\dto\ClientDatabaseDTO;
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
        $ClientDatabase->passwordHash = Yii::$app->security->generatePasswordHash($clientDatabaseDTO->password);
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


    public function getClientRefreshToken(string $id, ?string $token = null)
    {
        $ClientDatabaseHasRefreshToken = ClientDatabaseHasRefreshToken::findOne([
            'clientDatabase' => $id,
            'user' => Yii::$app->user->id
        ]);


        if(empty($ClientDatabaseHasRefreshToken)) {
            Yii::$app->exception->throw('Unauthorized user', 422);
        }


        if(!empty($token)) {
            $ClientDatabaseHasRefreshToken->validateRefreshToken($token);
        } else {
            $token = $ClientDatabaseHasRefreshToken->generateRefreshToken();
        }
        

        $ClientDatabaseHasRefreshToken->saveQuietly(false);

        return $token;
    }


    public function connect(string $id, ?string $refreshToken = null): ClientDatabaseEntity
    {
        $ClientDatabaseHasRefreshToken = ClientDatabaseHasRefreshToken::findOne([
            'clientDatabase' => $id,
            'user' => Yii::$app->user->id
        ]);

        if(!empty($refreshToken) && !$ClientDatabaseHasRefreshToken->validateRefreshToken($refreshToken)) {
            Yii::$app->exception->throw('Unauthorized user', 422);
        }

        $ClientDatabase = ClientDatabase::findOne($id);

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
}
