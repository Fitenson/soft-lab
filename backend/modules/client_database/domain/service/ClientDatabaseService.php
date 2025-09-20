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


class ClientDatabaseService {
    private IndexClientDatabaseUseCase $indexClientDatabaseUseCase;
    private CreateClientDatabaseUseCase $createClientDatabaseUseCase;
    private UpdateClientDatabaseUseCase $updateClientDatabaseUseCase;
    private ViewClientDatabaseUseCase $viewClientDatabaseUseCase;
    private RemoveClientDatabaseUseCase $removeClientDatabaseUseCase;


    public function __construct(
        IndexClientDatabaseUseCase $indexClientDatabaseUseCase,
        CreateClientDatabaseUseCase $createClientDatabaseUseCase,
        UpdateClientDatabaseUseCase $updateClientDatabaseUseCase,
        ViewClientDatabaseUseCase $viewClientDatabaseUseCase,
        RemoveClientDatabaseUseCase $removeClientDatabaseUseCase
    )
    {
        $this->indexClientDatabaseUseCase = $indexClientDatabaseUseCase;
        $this->createClientDatabaseUseCase = $createClientDatabaseUseCase;
        $this->updateClientDatabaseUseCase = $updateClientDatabaseUseCase;
        $this->viewClientDatabaseUseCase = $viewClientDatabaseUseCase;
        $this->removeClientDatabaseUseCase = $removeClientDatabaseUseCase;
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
        return $this->viewClientDatabaseUseCase->execute($id);
    }


    public function removeClientDatabase(array $data): array
    {
        return $this->removeClientDatabaseUseCase->execute($data);
    }
}
