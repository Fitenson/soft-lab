<?php

namespace backend\modules\api_test\domain\service;

use Yii;
use Throwable;
use backend\components\service\BaseService;
use backend\modules\api_test\data\models\ApiTest;
use backend\modules\api_test\data\dto\ApiTestDTO;
use backend\modules\api_test\data\models\ApiTestHasData;
use backend\modules\api_test\domain\entity\ApiTestEntity;
use backend\modules\client_database\data\models\ClientDatabase;
use backend\modules\api_test\domain\entity\ApiTestHasDataEntity;
use backend\modules\api_test\data\dto\ApiTestHasDataDTO;

use backend\modules\api_test\domain\usecase\CreateApiTestHasDataUseCase;
use backend\modules\project\domain\usecase\IndexProjectUseCase;
use backend\modules\api_test\domain\usecase\CreateApiTestUseCase;
use backend\modules\api_test\domain\usecase\RemoveApiTestUseCase;
use backend\modules\api_test\domain\usecase\UpdateApiTestHasDataUseCase;
use backend\modules\client_database\domain\entity\ClientDatabaseEntity;
use backend\modules\client_database\domain\usecase\GetTableListUseCase;
use yii\helpers\ArrayHelper;

class ApiTestService extends BaseService {
    private IndexProjectUseCase $indexProjectUseCase;
    private CreateApiTestUseCase $createApiTestUseCase;
    private CreateApiTestHasDataUseCase $createApiTestHasDataUseCase;
    private UpdateApiTestHasDataUseCase $updateApiTestHasDataUseCase;
    private RemoveApiTestUseCase $removeApiTestUseCase;
    private GetTableListUseCase $getTableListUseCase;


    public function __construct(
        IndexProjectUseCase $indexProjectUseCase,
        CreateApiTestUseCase $createApiTestUseCase,
        RemoveApiTestUseCase $removeApiTestUseCase,
        CreateApiTestHasDataUseCase $createApiTestHasDataUseCase,
        UpdateApiTestHasDataUseCase $updateApiTestHasDataUseCase,
        GetTableListUseCase $getTableListUseCase
    )
    {
        $this->indexProjectUseCase = $indexProjectUseCase;
        $this->createApiTestUseCase = $createApiTestUseCase;
        $this->removeApiTestUseCase = $removeApiTestUseCase;
        $this->createApiTestHasDataUseCase = $createApiTestHasDataUseCase;
        $this->updateApiTestHasDataUseCase = $updateApiTestHasDataUseCase;
        $this->getTableListUseCase = $getTableListUseCase;
    }


    public function listProjects()
    {
        return $this->indexProjectUseCase->execute([], 'list');
    }


    public function index()
    {
        $parentApiTests = ApiTest::find()
        ->selectIndex()
        ->joinWith(['apiTests' => function($subApiTestQuery) {
            $subApiTestQuery
            ->selectIndex('apiTest')
            ->orderBy(['apiTest.testName' => SORT_ASC]);
        }])
        ->joinWith(['apiTestHasDatas' => function($parentApiTestHasDataQuery) {
            $parentApiTestHasDataQuery
            ->alias('parentApiTestHasData')
            ->select([
                'parentApiTestHasData.UUID',
                'parentApiTestHasData.apiTest',
                'parentApiTestHasData.fieldType',
                'parentApiTestHasData.key',
                'parentApiTestHasData.value',
                'parentApiTestHasData.enabled',
                'parentApiTestHasData.seq',
                'parentApiTestHasData.description',
            ])
            ->orderBy(['parentApiTestHasData.seq' => SORT_ASC]);
        }])
        ->orderBy(['parentApiTest.testName' => SORT_ASC])
        ->asArray()
        ->all();

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
        $_actionUUID = $this->getActionUUID();
        $this->createApiTestUseCase->actionUUID = $_actionUUID;
        $this->createApiTestHasDataUseCase->actionUUID = $_actionUUID;

        $apiTestEntity = $params['apiTestEntity'];
        $apiTestHasDataEntities = $params['apiTestHasDataEntities'];
        $clientDatabaseToken = $params['clientDatabaseToken'];        

        try {
            $transaction = Yii::$app->db->beginTransaction();
            $ClientDatabase = ClientDatabase::find()
            ->byRefreshToken($clientDatabaseToken)
            ->one();

            $clientDatabaseEntity = new ClientDatabaseEntity($ClientDatabase->getAttributes());
            
            $newApiTestEntity = $this->createApiTestUseCase->execute($apiTestEntity, $clientDatabaseEntity);

            $newApiTestHasDataDTO = [];

            foreach($apiTestHasDataEntities as $index => $apiTestHasDataEntity) {
                $seq = $index + 1;
                $apiTestHasDataEntity->setSeq($seq);
                $apiTestHasDataEntity->setApiTest($newApiTestEntity->getUUID());
                $newApiTestHasDataEntity = $this->createApiTestHasDataUseCase->execute($apiTestHasDataEntity);
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
        $_actionUUID = $this->getActionUUID();
        $this->createApiTestHasDataUseCase->actionUUID = $_actionUUID;
        $this->updateApiTestHasDataUseCase->actionUUID = $_actionUUID;

        $apiTestEntity = $params['apiTestEntity'];
        $apiTestHasDataEntities = $params['apiTestHasDataEntities'];
        $clientDatabaseToken = $params['clientDatabaseToken'];

        try {
            $transaction = Yii::$app->db->beginTransaction();
            $ClientDatabase = ClientDatabase::find()
            ->byRefreshToken($clientDatabaseToken)
            ->one();

            $clientDatabaseEntity = new ClientDatabaseEntity($ClientDatabase->getAttributes());

            $ApiTest = ApiTest::find()
            ->where(['apiTest.UUID' => $apiTestEntity->getUUID()])
            ->joinWith('apiTestHasDatas')
            ->one();

            $ApiTestHasDatas = ArrayHelper::index($ApiTest->apiTestHasDatas, 'UUID');

            $apiTestDTO = $apiTestEntity->asDTO();
            $ApiTest->load($apiTestDTO->getAttributes(), '');
            $ApiTest->_actionUUID = $_actionUUID;
            $ApiTest->save(false);
            
            $newApiTestHasDataDTO = [];
            $newApiTestEntity = new ApiTestEntity($ApiTest->getAttributes(), '');

            if(!empty($apiTestHasDataEntities)) {
                $existingApiTestHasDataUUIDs = array_filter(array_map(fn($entity) => $entity->getUUID(), $apiTestHasDataEntities));

                foreach($ApiTestHasDatas as $ApiTestHasData) {
                    if(!in_array($ApiTestHasData->UUID, $existingApiTestHasDataUUIDs)) {
                        $ApiTestHasData->_actionUUID = $_actionUUID;
                        $ApiTestHasData->delete();
                    }
                }


                foreach($apiTestHasDataEntities as $index => $apiTestHasDataEntity) {
                    $seq = $index + 1;
                    $apiTestHasDataEntity->setSeq($seq);
                    $apiTestHasDataEntity->setApiTest($newApiTestEntity->getUUID());

                    if(!empty($apiTestHasDataEntity->getUUID())) {
                        $newApiTestHasDataEntity = $this->updateApiTestHasDataUseCase->execute($apiTestHasDataEntity);
                    } else {
                        $newApiTestHasDataEntity = $this->createApiTestHasDataUseCase->execute($apiTestHasDataEntity);
                    }

                    $newApiTestHasDataDTO[] = $newApiTestHasDataEntity->asDTO();
                }
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


    public function removeApiTest(array $data): array
    {
        $this->removeApiTestUseCase->actionUUID = $this->getActionUUID();
        return $this->removeApiTestUseCase->execute($data);
    }


    public function getTableList(array $params, string $refreshToken): array
    {
        return $this->getTableListUseCase->execute($params, $refreshToken);
    }
}
