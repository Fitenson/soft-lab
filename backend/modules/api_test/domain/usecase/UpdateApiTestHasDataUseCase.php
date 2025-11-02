<?php

namespace backend\modules\api_test\domain\usecase;

use backend\modules\api_test\data\models\ApiTestHasData;
use backend\modules\api_test\domain\entity\ApiTestHasDataEntity;


class UpdateApiTestHasDataUseCase {
    public string $actionUUID;


    /**
    * @param ApiTestHasDataEntity $apiTestHasDataEntity
     * 
     * @return ApiTestHasDataEntity
    */
    public function execute(ApiTestHasDataEntity $apiTestHasDataEntity) {
        $_actionUUID = $this->actionUUID;

        $ApiTestHasData = ApiTestHasData::findOne($apiTestHasDataEntity->getUUID());
        $ApiTestHasData->load($apiTestHasDataEntity->asArray(), '');
        $ApiTestHasData->_actionUUID = $_actionUUID;
        $ApiTestHasData->save(false);

        $newApiTestHasDataEntity = new ApiTestHasDataEntity($ApiTestHasData->getAttributes());

        return $newApiTestHasDataEntity;
    }
}
