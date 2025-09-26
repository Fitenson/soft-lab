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

class ApiTestService {
    private IndexProjectUseCase $indexProjectUseCase;
    private IndexApiTestUseCase $indexApiTestUseCase;
    private CreateApiTestUseCase $createApiTestUseCase;
    private UpdateApiTestUseCase $updateApiTestUseCase;
    private RemoveApiTestUseCase $removeApiTestUseCase;


    public function __construct(
        IndexProjectUseCase $indexProjectUseCase,
        IndexApiTestUseCase $indexApiTestUseCase,
        CreateApiTestUseCase $createApiTestUseCase,
        UpdateApiTestUseCase $updateApiTestUseCase,
        RemoveApiTestUseCase $removeApiTestUseCase
    )
    {
        $this->indexProjectUseCase = $indexProjectUseCase;
        $this->indexApiTestUseCase = $indexApiTestUseCase;
        $this->createApiTestUseCase = $createApiTestUseCase;
        $this->updateApiTestUseCase = $updateApiTestUseCase;
        $this->removeApiTestUseCase = $removeApiTestUseCase;
    }

    public function listProjects()
    {
        return $this->indexProjectUseCase->execute([], 'list');
    }

    public function index()
    {
        return $this->indexApiTestUseCase->execute();
    }

    public function createApiTest(ApiTestEntity $apiTestEntity): ApiTestDTO
    {
        try {
            $transaction = Yii::$app->db->beginTransaction();
            $newApiTestEntity = $this->createApiTest($apiTestEntity);
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
            $newApiTestEntity = $this->updateApiTest($apiTestEntity);
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
