<?php

namespace backend\modules\api_test\domain\usecase;

use backend\modules\api_test\domain\repository\ApiTestRepository;


class IndexApiTestUseCase {
    private ApiTestRepository $apiTestRepository;

    public function __construct(ApiTestRepository $apiTestRepository)
    {
        $this->apiTestRepository = $apiTestRepository;
    }

    public function execute() {
        return $this->apiTestRepository->index();
    }
}
