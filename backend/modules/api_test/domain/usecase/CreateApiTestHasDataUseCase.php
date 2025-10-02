<?php

namespace backend\modules\api_test\domain\usecase;

use backend\modules\api_test\domain\repository\ApiTestRepository;


class CreateApiTestHasDataUseCase {
    private ApiTestRepository $apiTestRepository;

    public function __construct(ApiTestRepository $apiTestRepository)
    {
        $this->apiTestRepository = $apiTestRepository;
    }

    /**
    * @param array{
    *     apiTestHasDataEntities: ApiTestHasDataEntity[],
    * } $params
     * 
     *  @return ApiTestHasDataEntity[]
    */
    public function execute(array $params) {
        $apiTestHasDataEntities = $params['apiTestHasDataEntities'];

        return $this->apiTestRepository->createApiTestHasData([
            'apiTestHasDataEntities' => $apiTestHasDataEntities
        ]);
    }
}
