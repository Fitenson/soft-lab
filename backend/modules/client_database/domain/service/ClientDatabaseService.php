<?php

namespace backend\modules\client_database\domain\service;

use Yii;
use Throwable;
use backend\components\exception\ApiException;
use backend\components\service\BaseService;
use backend\modules\client_database\data\models\ClientDatabase;
use backend\modules\client_database\data\dto\ClientDatabaseDTO;
use backend\modules\client_database\data\models\ClientDatabaseHasRefreshToken;
use backend\modules\client_database\domain\entity\ClientDatabaseEntity;
use backend\modules\client_database\domain\usecase\CreateClientDatabaseUseCase;
use backend\modules\client_database\domain\usecase\UpdateClientDatabaseUseCase;
use backend\modules\client_database\domain\usecase\RemoveClientDatabaseUseCase;
use backend\modules\client_database\domain\usecase\GetTableListUseCase;


class ClientDatabaseService extends BaseService {
    private CreateClientDatabaseUseCase $createClientDatabaseUseCase;
    private UpdateClientDatabaseUseCase $updateClientDatabaseUseCase;
    private RemoveClientDatabaseUseCase $removeClientDatabaseUseCase;
    private GetTableListUseCase $getTableListUseCase;


    public function __construct(
        CreateClientDatabaseUseCase $createClientDatabaseUseCase,
        UpdateClientDatabaseUseCase $updateClientDatabaseUseCase,
        RemoveClientDatabaseUseCase $removeClientDatabaseUseCase,
        GetTableListUseCase $getTableListUseCase
    )
    {
        $this->createClientDatabaseUseCase = $createClientDatabaseUseCase;
        $this->updateClientDatabaseUseCase = $updateClientDatabaseUseCase;
        $this->removeClientDatabaseUseCase = $removeClientDatabaseUseCase;
        $this->getTableListUseCase = $getTableListUseCase;
    }


    public function index() {
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


    public function createClientDatabase(ClientDatabaseEntity $clientDatabaseEntity): ClientDatabaseDTO
    {
        try {
            $transaction = Yii::$app->db->beginTransaction();
            $this->createClientDatabaseUseCase->actionUUID = $this->getActionUUID();
            $clientDatabaseEntity = $this->createClientDatabaseUseCase->execute($clientDatabaseEntity);
            $transaction->commit();
            return $clientDatabaseEntity->asDTO();
        } catch(ApiException $error) {
            $transaction->rollBack();
            throw $error;
            return new ClientDatabaseDTO();
        }
    }


    public function updateClientDatabase(ClientDatabaseEntity $clientDatabaseEntity): ClientDatabaseDTO
    {
        try {
            $transaction = Yii::$app->db->beginTransaction();
            $this->updateClientDatabaseUseCase->actionUUID = $this->getActionUUID();
            $clientDatabaseEntity = $this->updateClientDatabaseUseCase->execute($clientDatabaseEntity);
            $transaction->commit();
            return $clientDatabaseEntity->asDTO();
        } catch(ApiException $error) {
            $transaction->rollBack();
            throw $error;
            return new ClientDatabaseDTO();
        }
    }


    public function removeClientDatabase(array $data): array
    {
        $this->removeClientDatabaseUseCase->actionUUID = $this->getActionUUID();
        return $this->removeClientDatabaseUseCase->execute($data);
    }


    public function connectClientDatabase(string $id, ?string $refreshToken = null): ClientDatabaseDTO
    {
        $User = Yii::$app->user->identity;

        if(!empty($refreshToken)) {
            $ClientDatabase = ClientDatabase::find()
            ->byRefreshToken($refreshToken)
            ->one();
        } else {
            $ClientDatabase = ClientDatabase::findOne($id);

            $ClientDatabaseHasRefreshToken = ClientDatabaseHasRefreshToken::find()->where([
                'user' => $User->UUID,
                'clientDatabase' => $id
            ])
            ->one();

            if(empty($ClientDatabaseHasRefreshToken)) {
                $ClientDatabaseHasRefreshToken = new ClientDatabaseHasRefreshToken();
                $ClientDatabaseHasRefreshToken->user = $User->UUID;
                $ClientDatabaseHasRefreshToken->clientDatabase = $id;
            }

            $refreshToken = $ClientDatabaseHasRefreshToken->generateRefreshToken();
            $ClientDatabaseHasRefreshToken->save(false);
        }

        $clientDatabaseEntity = new ClientDatabaseEntity($ClientDatabase->getAttributes());
        $clientDatabaseEntity->setPassword($refreshToken);

        return $clientDatabaseEntity->asDTO();
    }

    
    public function getTableList(array $params, string $refreshToken): array
    {
        return $this->getTableListUseCase->execute($params, $refreshToken);
    }
}
