<?php

namespace backend\modules\api_test\data\repository;

use Yii;
use Throwable;
use backend\components\repository\BaseRepository;
use backend\modules\api_test\data\models\ApiTest;
use backend\modules\client_database\data\models\ClientDatabase;
use backend\modules\project\data\models\Project;
use backend\modules\api_test\domain\entity\ApiTestEntity;
use backend\modules\api_test\domain\repository\ApiTestRepository;
use backend\modules\api_test\data\dto\ApiTestDTO;
use backend\modules\api_test\data\models\ApiTestHasData;
use backend\modules\api_test\domain\entity\ApiTestHasDataEntity;
use backend\modules\client_database\domain\entity\ClientDatabaseEntity;


class YiiApiTestRepository extends BaseRepository implements ApiTestRepository {
    public function index()
    {
        $ApiTests = ApiTest::find()
        ->selectIndex()
        ->joinWith(['apiTests' => function($subApiTestQuery) {
            $subApiTestQuery
            ->alias('subApiTest')
            ->select([
                'subApiTest.UUID',
                'subApiTest.UUID',
                'subApiTest.parentApiTest',
                'subApiTest.clientDatabase',
                'clientDatabaseName' => ClientDatabase::find()->select(['databaseName'])->where('clientDatabase.UUID = subApiTest.clientDatabase'),
                'subApiTest.project',
                'subApiTest.isFolder',
                'subApiTest.seq',
                'projectName' => Project::find()->select(['projectName'])->where('project.UUID = subApiTest.project'),
                'subApiTest.testName',
                'subApiTest.description',
                'subApiTest.moreDescription',
                'subApiTest.transmission',
            ])
            ->orderBy(['subApiTest.testName' => SORT_ASC]);
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
                'parentApiTestHasData.description',
            ]);
        }])
        ->orderBy(['apiTest.testName' => SORT_ASC])
        ->asArray()
        ->all();

        return $ApiTests;
    }


    /**
    * @param array{
    *     apiTestEntity: ApiTestEntity,
    *     clientDatabaseToken: string
    * } $params
     * 
     * @return ApiTestEntity $apiTestEntity
    */
    public function createApiTest($params): ApiTestEntity
    {
        $_actionUUID = $this->getActionUUID();

        $apiTestEntity = $params['apiTestEntity'];
        $clientDatabaseEntity = $params['clientDatabaseEntity'];

        $apiTestDTO = $apiTestEntity->asDTO();
        $clientDatabaseDTO = $clientDatabaseEntity->asDTO();

        $ApiTest = new ApiTest();
        $ApiTest->load($apiTestDTO->asArray(), '');
        $ApiTest->clientDatabase = $clientDatabaseDTO->UUID;
        $ApiTest->_actionUUID = $_actionUUID;
        $ApiTest->save(false);

        return new ApiTestEntity($ApiTest->getAttributes());
    }


    /**
    * @param array{
    *     apiTestEntity: ApiTestEntity,
    *     apiTestHasDataEntities: ApiTestHasDataEntity[],
    *     clientDatabaseToken: string
    * } $params
     * 
     * @return ApiTestEntity $apiTestEntity
    */
    public function updateApiTest($params): ApiTestEntity
    {
        $_actionUUID = $this->getActionUUID();
        $apiTestEntity = $params['apiTestEntity'];
        $clientDatabaseEntity = $params['clientDatabaseEntity'];
        
        $apiTestDTO = $apiTestEntity->asDTO();
        $clientDatabaseDTO = $clientDatabaseEntity->asDTO();

        $ApiTest = ApiTest::findOne($apiTestDTO->UUID);
        $ApiTest->load($apiTestDTO->asArray(), '');
        $ApiTest->clientDatabase = $clientDatabaseDTO->UUID;
        $ApiTest->_actionUUID = $_actionUUID;
        $ApiTest->save(false);

        return new ApiTestEntity($ApiTest->getAttributes());
    }


    public function removeApiTest(array $data): array
    {
        $_actionUUID = $this->getActionUUID();
        $status = [
            'success' => [],
            'failed' => []
        ];

        $UUIDs = $data['UUIDs'];
        $ApiTests = ApiTest::find()->where(['UUID' => $UUIDs])->all();

        foreach($ApiTests as $ApiTest) {
            try {
                $transaction = Yii::$app->db->beginTransaction();
                $ApiTest->_actionUUID = $_actionUUID;
                $ApiTest->delete();
                $transaction->commit();

                $apiTestDTO = new ApiTestDTO();
                $apiTestDTO->load($ApiTest->getAttributes(), '');
                $status['success'][] = $apiTestDTO;
            } catch(Throwable $error) {
                $transaction->rollBack();

                $ApiTestDTO = new ApiTestDTO();
                $ApiTestDTO->load($ApiTest->getAttributes(), '');
                $status['failed'][] = $ApiTestDTO;
                $status['failed']['message'] = $error->getMessage();
            }
        }

        return $status;        
    }


    /**
    * @param ApiTestHasDataEntity $apiTestHasDataEntity
     * 
     * @return ApiTestHasDataEntity $apiTestHasDataEntity
    */
    public function createApiTestHasData(ApiTestHasDataEntity $apiTestHasDataEntity): ApiTestHasDataEntity
    {
        $_actionUUID = $this->getActionUUID();

        $ApiTestHasData = new ApiTestHasData();
        $ApiTestHasData->load($apiTestHasDataEntity->asArray(), '');
        $ApiTestHasData->_actionUUID = $_actionUUID;
        $ApiTestHasData->save(false);

        $newApiTestHasDataEntity = new ApiTestHasDataEntity($ApiTestHasData->getAttributes());

        return $newApiTestHasDataEntity;
    }


    /**
    * @param ApiTestHasDataEntity $apiTestHasDataEntity
     * 
     * @return ApiTestHasDataEntity $apiTestHasDataEntity
    */
    public function updateApiTestHasData(ApiTestHasDataEntity $apiTestHasDataEntity): ApiTestHasDataEntity
    {
        $_actionUUID = $this->getActionUUID();

        $ApiTestHasData = ApiTestHasData::findOne($apiTestHasDataEntity->getUUID());
        $ApiTestHasData->load($apiTestHasDataEntity->asArray(), '');
        $ApiTestHasData->_actionUUID = $_actionUUID;
        $ApiTestHasData->save(false);

        $newApiTestHasDataEntity = new ApiTestHasDataEntity($ApiTestHasData->getAttributes());

        return $newApiTestHasDataEntity;
    }
}
