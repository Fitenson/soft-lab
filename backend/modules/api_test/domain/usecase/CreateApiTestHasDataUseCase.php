<?php

namespace backend\modules\api_test\domain\usecase;

use backend\modules\api_test\data\models\ApiTestHasData;
use backend\modules\api_test\domain\entity\ApiTestHasDataEntity;


class CreateApiTestHasDataUseCase {
    public string $actionUUID;

    /**
    * @param ApiTestHasDataEntity $apiTestHasDataEntity
     * 
     * @return ApiTestHasDataEntity
    */
    public function execute(ApiTestHasDataEntity $apiTestHasDataEntity) {
        $_actionUUID = $this->actionUUID;

        $ApiTestHasData = new ApiTestHasData();
        $ApiTestHasData->load($apiTestHasDataEntity->asArray(), '');
        $ApiTestHasData->_actionUUID = $_actionUUID;
        $ApiTestHasData->save(false);

        $newApiTestHasDataEntity = new ApiTestHasDataEntity($ApiTestHasData->getAttributes());

        return $newApiTestHasDataEntity;
    }
}
