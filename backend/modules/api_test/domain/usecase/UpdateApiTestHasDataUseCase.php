<?php

namespace backend\modules\api_test\domain\usecase;

use backend\modules\api_test\domain\repository\ApiTestRepository;
use backend\modules\api_test\domain\entity\ApiTestHasDataEntity;


class UpdateApiTestHasDataUseCase {
    private ApiTestRepository $apiTestRepository;

    public function __construct(ApiTestRepository $apiTestRepository)
    {
        $this->apiTestRepository = $apiTestRepository;
    }

    /**
    * @param ApiTestHasDataEntity $apiTestHasDataEntity
     * 
     * @return ApiTestHasDataEntity
    */
    public function execute(ApiTestHasDataEntity $apiTestHasDataEntity) {
       return $this->apiTestRepository->createApiTestHasData($apiTestHasDataEntity);
    }
}
