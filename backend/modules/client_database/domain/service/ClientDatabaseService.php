<?php

namespace backend\modules\client_database\domain\service;

use Yii;
use backend\components\exception\ApiException;

use backend\modules\client_database\data\dto\ClientDatabaseDTO;
use backend\modules\client_database\domain\entity\ClientDatabaseEntity;
use backend\modules\client_database\domain\usecase\CreateClientDatabaseUseCase;
use backend\modules\client_database\domain\usecase\IndexClientDatabaseUseCase;
use backend\modules\client_database\domain\usecase\UpdateClientDatabaseUseCase;
use backend\modules\client_database\domain\usecase\RemoveClientDatabaseUseCase;
use backend\modules\client_database\domain\usecase\ViewClientDatabaseUseCase;
use backend\modules\client_database\domain\usecase\GetClientRefreshTokenUseCase;


class ClientDatabaseService {
    private IndexClientDatabaseUseCase $indexClientDatabaseUseCase;
    private CreateClientDatabaseUseCase $createClientDatabaseUseCase;
    private UpdateClientDatabaseUseCase $updateClientDatabaseUseCase;
    private ViewClientDatabaseUseCase $viewClientDatabaseUseCase;
    private RemoveClientDatabaseUseCase $removeClientDatabaseUseCase;
    private GetClientRefreshTokenUseCase $getClientRefreshTokenUseCase;


    public function __construct(
        IndexClientDatabaseUseCase $indexClientDatabaseUseCase,
        CreateClientDatabaseUseCase $createClientDatabaseUseCase,
        UpdateClientDatabaseUseCase $updateClientDatabaseUseCase,
        ViewClientDatabaseUseCase $viewClientDatabaseUseCase,
        RemoveClientDatabaseUseCase $removeClientDatabaseUseCase,
        GetClientRefreshTokenUseCase $getClientRefreshTokenUseCase
    )
    {
        $this->indexClientDatabaseUseCase = $indexClientDatabaseUseCase;
        $this->createClientDatabaseUseCase = $createClientDatabaseUseCase;
        $this->updateClientDatabaseUseCase = $updateClientDatabaseUseCase;
        $this->viewClientDatabaseUseCase = $viewClientDatabaseUseCase;
        $this->removeClientDatabaseUseCase = $removeClientDatabaseUseCase;
        $this->getClientRefreshTokenUseCase = $getClientRefreshTokenUseCase;
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

    
    public function viewClientDatabase(string $id): ClientDatabaseDTO
    {
        $clientDatabaseEntity= $this->viewClientDatabaseUseCase->execute($id);
        return $clientDatabaseEntity->asDTO();
    }


    public function removeClientDatabase(array $data): array
    {
        return $this->removeClientDatabaseUseCase->execute($data);
    }


    public function connectClientDatabase(string $id)
    {
        $token = $this->getClientRefreshTokenUseCase->execute($id);

        $clientDatabaseEntity = $this->viewClientDatabaseUseCase->execute($id);
        $clientDatabaseEntity->setPassword($token);

        return $clientDatabaseEntity->asDTO();
    }
}
