<?php

namespace backend\modules\api_test\data\repository;

use Yii;
use Throwable;
use backend\components\repository\BaseRepository;
use backend\modules\api_test\data\models\ApiTest;
use backend\modules\api_test\domain\entity\ApiTestEntity;
use backend\modules\api_test\domain\repository\ApiTestRepository;
use backend\modules\api_test\data\dto\ApiTestDTO;
use backend\modules\client_database\domain\entity\ClientDatabaseEntity;

class YiiApiTestRepository extends BaseRepository implements ApiTestRepository {
    public function index()
    {
        $ApiTests = ApiTest::find()
        // ->alias('module')
        ->selectIndex()
        ->orderBy(['testName' => SORT_ASC])
        ->asArray()
        ->all();

        $total = count($ApiTests);


        return [
            'total' => (string)$total,
            'rows' => $ApiTests
        ];
    }


    public function createApiTest(ApiTestEntity $apiTestEntity, ClientDatabaseEntity $clientDatabaseEntity): ApiTestEntity
    {
        $_actionUUID = $this->getActionUUID();
        $apiTestDTO = $apiTestEntity->asDTO();
        $clientDatabaseDTO = $clientDatabaseEntity->asDTO();

        $ApiTest = new ApiTest();
        $ApiTest->load($apiTestDTO->asArray(), '');
        $ApiTest->clientDatabase = $clientDatabaseDTO->UUID;
        $ApiTest->_actionUUID = $_actionUUID;
        $ApiTest->save(false);

        return new ApiTestEntity($ApiTest->getAttributes());
    }

    public function updateApiTest(ApiTestEntity $apiTestEntity, ClientDatabaseEntity $clientDatabaseEntity): ApiTestEntity
    {
        $_actionUUID = $this->getActionUUID();
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
}
