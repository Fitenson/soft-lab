<?php

namespace backend\modules\api_test\domain\service;

use Yii;
use Throwable;
use backend\modules\api_test\data\dto\ApiTestDTO;
use backend\modules\api_test\domain\entity\ApiTestEntity;
use backend\modules\api_test\domain\entity\ApiTestHasDataEntity;
use backend\modules\api_test\domain\usecase\CreateApiTestHasDataUseCase;
use backend\modules\api_test\domain\usecase\IndexApiTestUseCase;
use backend\modules\project\domain\usecase\IndexProjectUseCase;
use backend\modules\api_test\domain\usecase\CreateApiTestUseCase;
use backend\modules\api_test\domain\usecase\RemoveApiTestUseCase;
use backend\modules\api_test\domain\usecase\UpdateApiTestUseCase;
use backend\modules\client_database\domain\usecase\ConnectClientDatabaseUseCase;
use backend\modules\client_database\domain\usecase\GetTableListUseCase;

class ApiTestService {
    private IndexProjectUseCase $indexProjectUseCase;
    private ConnectClientDatabaseUseCase $connectClientDatabaseUseCase;
    private IndexApiTestUseCase $indexApiTestUseCase;
    private CreateApiTestUseCase $createApiTestUseCase;
    private CreateApiTestHasDataUseCase $createApiTestHasDataUseCase;
    private UpdateApiTestUseCase $updateApiTestUseCase;
    private RemoveApiTestUseCase $removeApiTestUseCase;
    private GetTableListUseCase $getTableListUseCase;


    public function __construct(
        IndexProjectUseCase $indexProjectUseCase,
        IndexApiTestUseCase $indexApiTestUseCase,
        CreateApiTestUseCase $createApiTestUseCase,
        UpdateApiTestUseCase $updateApiTestUseCase,
        RemoveApiTestUseCase $removeApiTestUseCase,
        ConnectClientDatabaseUseCase $connectClientDatabaseUseCase,
        CreateApiTestHasDataUseCase $createApiTestHasDataUseCase,
        GetTableListUseCase $getTableListUseCase
    )
    {
        $this->indexProjectUseCase = $indexProjectUseCase;
        $this->indexApiTestUseCase = $indexApiTestUseCase;
        $this->createApiTestUseCase = $createApiTestUseCase;
        $this->updateApiTestUseCase = $updateApiTestUseCase;
        $this->removeApiTestUseCase = $removeApiTestUseCase;
        $this->connectClientDatabaseUseCase = $connectClientDatabaseUseCase;
        $this->createApiTestHasDataUseCase = $createApiTestHasDataUseCase;
        $this->getTableListUseCase = $getTableListUseCase;
    }


    public function listProjects()
    {
        return $this->indexProjectUseCase->execute([], 'list');
    }


    public function index()
    {
        $parentApiTests = $this->indexApiTestUseCase->execute();

        // foreach($parentApiTests as &$parentApiTest) {
        //     $apiTests = $parentApiTest['apiTests'];

        //     // $apiTestHasData = $parentApiTest[''];
        // }

        $total = count($parentApiTests);

        return [
            'total' => (string)$total,
            'rows' => $parentApiTests
        ];
    }


    /**
    * @param array{
    *     apiTestEntity: ApiTestEntity,
    *     apiTestHasDataEntities: ApiTestHasDataEntity[],
    *     clientDatabaseToken: string
    * } $params
     * 
     *  @return array{
     *      apiTestDTO: ApiTestDTO,
     *      apiTestHasDataDTO: ApiTestHasDataDTO[]
     * }
    */
    public function createApiTest($params): array
    {
        $apiTestEntity = $params['apiTestEntity'];
        $apiTestHasDataEntities = $params['apiTestHasDataEntities'];
        $clientDatabaseToken = $params['clientDatabaseToken'];

        try {
            $transaction = Yii::$app->db->beginTransaction();
            $ClientDatabaseEntity = $this->connectClientDatabaseUseCase->execute([
                'refreshToken' => $clientDatabaseToken
            ]);
            
            $newApiTestEntity = $this->createApiTestUseCase->execute($apiTestEntity, $ClientDatabaseEntity);

            $newApiTestHasDataEntities = $this->createApiTestHasDataUseCase->execute([
                'apiTestHasDataEntities' => $apiTestHasDataEntities
            ]);

            $newApiTestHasDataDTO = [];
            foreach($newApiTestHasDataEntities as $newApiTestHasDataEntity) {
                $newApiTestHasDataDTO[] = $newApiTestHasDataEntity->asDTO();
            }

            $transaction->commit();

            return [
                'apiTestDTO' => $newApiTestEntity->asDTO(),
                'apiTestHasDataDTO' => $newApiTestHasDataDTO
            ];
        } catch(Throwable $error) {
            $transaction->rollBack();
            Yii::$app->exception->throw($error->getMessage(), 422);
            throw $error;
        }
    }


    /**
    * @param array{
    *     apiTestEntity: ApiTestEntity,
    *     apiTestHasDataEntities: ApiTestHasDataEntity[],
    *     clientDatabaseToken: string
    * } $params
    * 
    *  @return array
    */
    public function updateApiTest($params): array
    {
        $apiTestEntity = $params['apiTestEntity'];
        $apiTestHasDataEntities = $params['apiTestHasDataEntities'];
        $clientDatabaseToken = $params['clientDatabaseToken'];

        try {
            $transaction = Yii::$app->db->beginTransaction();
            $ClientDatabaseEntity = $this->connectClientDatabaseUseCase->execute([
                'refreshToken' => $clientDatabaseToken
            ]);

            $newApiTestEntity = $this->updateApiTestUseCase->execute($apiTestEntity, $ClientDatabaseEntity);
            
            $newApiTestHasDataDTO = [];

            if(!empty($apiTestHasDataEntities)) {
                $newApiTestHasDataEntities = $this->createApiTestHasDataUseCase->execute([
                    'apiTestHasDataEntities' => $apiTestHasDataEntities
                ]);

                foreach($newApiTestHasDataEntities as $newApiTestHasDataEntity) {
                    $newApiTestHasDataDTO[] = $newApiTestHasDataEntity->asDTO();
                }
            }

            // $transaction->commit();

            return [
                'apiTestDTO' => $newApiTestEntity->asDTO(),
                'apiTestHasDataDTO' => $newApiTestHasDataDTO
            ];
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

    public function getTableList(string $refreshToken): array
    {
        return $this->getTableListUseCase->execute($refreshToken);
    }
}
