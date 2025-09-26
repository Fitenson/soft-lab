<?php

namespace backend\modules\api_test\domain\usecase;

use backend\modules\api_test\domain\entity\ApiTestEntity;
use backend\modules\api_test\domain\repository\ApiTestRepository;


class RemoveApiTestUseCase {
    private ApiTestRepository $apiTestRepository;

    public function __construct(ApiTestRepository $apiTestRepository)
    {
        $this->apiTestRepository = $apiTestRepository;
    }

    public function execute(array $data) {
        return $this->apiTestRepository->removeApiTest($data);
    }
}
