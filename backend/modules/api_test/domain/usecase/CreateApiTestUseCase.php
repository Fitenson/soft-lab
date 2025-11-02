<?php

namespace backend\modules\api_test\domain\usecase;

use backend\modules\api_test\domain\entity\ApiTestEntity;
use backend\modules\api_test\data\models\ApiTest;


class CreateApiTestUseCase {
    public string $actionUUID;


    public function execute(ApiTestEntity $apiTestEntity) {
        $_actionUUID = $this->actionUUID;

        $apiTestDTO = $apiTestEntity->asDTO();
        $ApiTest = new ApiTest();
        $ApiTest->load($apiTestDTO->asArray(), '');
        $ApiTest->_actionUUID = $_actionUUID;
        $ApiTest->save(false);

        return new ApiTestEntity($ApiTest->getAttributes());
    }
}
