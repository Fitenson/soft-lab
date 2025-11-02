<?php

namespace backend\modules\api_test\domain\usecase;

use Yii;
use Throwable;
use backend\modules\api_test\data\models\ApiTest;
use backend\modules\api_test\data\dto\ApiTestDTO;


class RemoveApiTestUseCase {
    public string $actionUUID;


    public function execute(array $data) {
        $_actionUUID = $this->actionUUID;

        $status = [
            'success' => [],
            'failed' => []
        ];

        $UUIDs = $data['UUIDs'];
        $ApiTests = ApiTest::find()
        ->where(['apiTest.UUID' => $UUIDs])
        ->joinWith('apiTestHasDatas')
        ->all();

        foreach($ApiTests as $ApiTest) {
            try {
                $transaction = Yii::$app->db->beginTransaction();

                foreach($ApiTest->apiTestHasDatas as $ApiTestData) {
                    $ApiTestData->_actionUUID = $_actionUUID;
                    $ApiTestData->delete();
                }

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
