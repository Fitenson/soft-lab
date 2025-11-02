<?php

namespace backend\modules\api_test\domain\usecase;

use backend\modules\api_test\data\models\ApiTest;
use backend\modules\api_test\domain\entity\ApiTestEntity;
use backend\modules\client_database\domain\entity\ClientDatabaseEntity;


class UpdateApiTestUseCase {
    public string $actionUUID;


    public function execute(ApiTestEntity $apiTestEntity) {
        $_actionUUID = $this->actionUUID;

        $apiTestDTO = $apiTestEntity->asDTO();
        $ApiTest = ApiTest::findOne($apiTestEntity->getUUID());
        $ApiTest->load($apiTestDTO->asArray(), '');
        $ApiTest->_actionUUID = $_actionUUID;
        $ApiTest->save(false);

        return new ApiTestEntity($ApiTest->getAttributes());
    }
}
