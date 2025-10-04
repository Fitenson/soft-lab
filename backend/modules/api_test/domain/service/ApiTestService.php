<?php

namespace backend\modules\api_test\domain\service;

use Yii;
use Throwable;
use backend\modules\api_test\data\dto\ApiTestDTO;
use backend\modules\api_test\domain\entity\ApiTestEntity;
use backend\modules\api_test\domain\usecase\IndexApiTestUseCase;
use backend\modules\project\domain\usecase\IndexProjectUseCase;
use backend\modules\api_test\domain\usecase\CreateApiTestUseCase;
use backend\modules\api_test\domain\usecase\RemoveApiTestUseCase;
use backend\modules\api_test\domain\usecase\UpdateApiTestUseCase;
use backend\modules\client_database\domain\usecase\ConnectClientDatabaseUseCase;

class ApiTestService {
    private IndexProjectUseCase $indexProjectUseCase;
    private ConnectClientDatabaseUseCase $connectClientDatabaseUseCase;
    private IndexApiTestUseCase $indexApiTestUseCase;
    private CreateApiTestUseCase $createApiTestUseCase;
    private UpdateApiTestUseCase $updateApiTestUseCase;
    private RemoveApiTestUseCase $removeApiTestUseCase;


    public function __construct(
        IndexProjectUseCase $indexProjectUseCase,
        IndexApiTestUseCase $indexApiTestUseCase,
        CreateApiTestUseCase $createApiTestUseCase,
        UpdateApiTestUseCase $updateApiTestUseCase,
        RemoveApiTestUseCase $removeApiTestUseCase,
        ConnectClientDatabaseUseCase $connectClientDatabaseUseCase
    )
    {
        $this->indexProjectUseCase = $indexProjectUseCase;
        $this->indexApiTestUseCase = $indexApiTestUseCase;
        $this->createApiTestUseCase = $createApiTestUseCase;
        $this->updateApiTestUseCase = $updateApiTestUseCase;
        $this->removeApiTestUseCase = $removeApiTestUseCase;
        $this->connectClientDatabaseUseCase = $connectClientDatabaseUseCase;
    }


    public function listProjects()
    {
        return $this->indexProjectUseCase->execute([], 'list');
    }


    public function index()
    {
        $parentApiTests = $this->indexApiTestUseCase->execute();

        foreach($parentApiTests as &$parentApiTest) {
            $apiTests = $parentApiTest['apiTests'];
        }

        return $parentApiTests;
    }


    public function createApiTest(ApiTestEntity $apiTestEntity, string $clientDatabaseToken): ApiTestDTO
    {
        try {
            $transaction = Yii::$app->db->beginTransaction();
            $ClientDatabaseEntity = $this->connectClientDatabaseUseCase->execute($apiTestEntity->getClientDatabase(), $clientDatabaseToken);
            $newApiTestEntity = $this->createApiTestUseCase->execute($apiTestEntity, $ClientDatabaseEntity);
            $transaction->commit();

            return $newApiTestEntity->asDTO();
        } catch(Throwable $error) {
            $transaction->rollBack();
            Yii::$app->exception->throw($error->getMessage(), 422);
            throw $error;
        }
    }


    public function updateApiTest(ApiTestEntity $apiTestEntity): ApiTestDTO
    {
        try {
            $transaction = Yii::$app->db->beginTransaction();
            $newApiTestEntity = $this->updateApiTestUseCase->execute($apiTestEntity);
            $transaction->commit();

            return $newApiTestEntity->asDTO();
        } catch(Throwable $error) {
            $transaction->rollBack();
            Yii::$app->exception->throw($error->getMessage(), 422);
            throw $error;
        }
    }


    public function removeApiTest(array $data): array
    {
        return $this->removeApiTestUseCase->execute($data);
    }
}
