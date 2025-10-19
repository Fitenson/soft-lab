<?php

namespace backend\modules\client_database\domain\service;

use Yii;
use Throwable;
use backend\components\exception\ApiException;

use backend\modules\client_database\data\dto\ClientDatabaseDTO;
use backend\modules\client_database\domain\entity\ClientDatabaseEntity;
use backend\modules\client_database\domain\usecase\ConnectClientDatabaseUseCase;
use backend\modules\client_database\domain\usecase\CreateClientDatabaseUseCase;
use backend\modules\client_database\domain\usecase\IndexClientDatabaseUseCase;
use backend\modules\client_database\domain\usecase\UpdateClientDatabaseUseCase;
use backend\modules\client_database\domain\usecase\RemoveClientDatabaseUseCase;
use backend\modules\client_database\domain\usecase\LoginClientDatabaseUseCase;
use backend\modules\client_database\domain\usecase\GetClientRefreshTokenUseCase;
use backend\modules\client_database\domain\usecase\GetTableListUseCase;

class ClientDatabaseService {
    private IndexClientDatabaseUseCase $indexClientDatabaseUseCase;
    private CreateClientDatabaseUseCase $createClientDatabaseUseCase;
    private UpdateClientDatabaseUseCase $updateClientDatabaseUseCase;
    private LoginClientDatabaseUseCase $loginClientDatabaseUseCase;
    private RemoveClientDatabaseUseCase $removeClientDatabaseUseCase;
    private GetClientRefreshTokenUseCase $getClientRefreshTokenUseCase;
    private ConnectClientDatabaseUseCase $connectClientDatabaseUseCase;
    private GetTableListUseCase $getTableListUseCase;


    public function __construct(
        IndexClientDatabaseUseCase $indexClientDatabaseUseCase,
        CreateClientDatabaseUseCase $createClientDatabaseUseCase,
        UpdateClientDatabaseUseCase $updateClientDatabaseUseCase,
        LoginClientDatabaseUseCase $loginClientDatabaseUseCase,
        RemoveClientDatabaseUseCase $removeClientDatabaseUseCase,
        GetClientRefreshTokenUseCase $getClientRefreshTokenUseCase,
        ConnectClientDatabaseUseCase $connectClientDatabaseUseCase,
        GetTableListUseCase $getTableListUseCase
    )
    {
        $this->indexClientDatabaseUseCase = $indexClientDatabaseUseCase;
        $this->createClientDatabaseUseCase = $createClientDatabaseUseCase;
        $this->updateClientDatabaseUseCase = $updateClientDatabaseUseCase;
        $this->loginClientDatabaseUseCase = $loginClientDatabaseUseCase;
        $this->removeClientDatabaseUseCase = $removeClientDatabaseUseCase;
        $this->getClientRefreshTokenUseCase = $getClientRefreshTokenUseCase;
        $this->connectClientDatabaseUseCase = $connectClientDatabaseUseCase;
        $this->getTableListUseCase = $getTableListUseCase;
    }


    public function index() {
        return $this->indexClientDatabaseUseCase->execute();
    }


    public function createClientDatabase(ClientDatabaseEntity $clientDatabaseEntity): ClientDatabaseDTO
    {
        try {
            $transaction = Yii::$app->db->beginTransaction();
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
        return $this->removeClientDatabaseUseCase->execute($data);
    }


    public function loginClientDatabase(string $id, string $password): ClientDatabaseDTO
    {
        try {
            $clientDatabaseEntity = $this->loginClientDatabaseUseCase->execute($id, $password);
            return $clientDatabaseEntity->asDTO();
        } catch(Throwable $error) {
            throw $error;
        }
    }


    public function connectClientDatabase(string $id, ?string $refreshToken = null): ClientDatabaseDTO
    {
        $token = $this->getClientRefreshTokenUseCase->execute($id);

        $clientDatabaseEntity = $this->connectClientDatabaseUseCase->execute([
            'id' => $id,
            'refreshToken' => $refreshToken
        ]);

        $clientDatabaseEntity->setPassword($token);

        return $clientDatabaseEntity->asDTO();
    }


    public function getTableList(array $params, string $refreshToken)
    {
        return $this->getTableListUseCase->execute($params, $refreshToken);
    }
}
