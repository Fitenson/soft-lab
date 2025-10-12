<?php

namespace backend\modules\api_test\domain\usecase;

use backend\modules\api_test\domain\entity\ApiTestEntity;
use backend\modules\api_test\domain\repository\ApiTestRepository;
use backend\modules\client_database\domain\entity\ClientDatabaseEntity;


class UpdateApiTestUseCase {
    private ApiTestRepository $apiTestRepository;

    public function __construct(ApiTestRepository $apiTestRepository)
    {
        $this->apiTestRepository = $apiTestRepository;
    }

    public function execute(ApiTestEntity $apiTestEntity, ClientDatabaseEntity $clientDatabaseEntity) {
        return $this->apiTestRepository->updateApiTest([
            'apiTestEntity' => $apiTestEntity,
            'clientDatabaseEntity' => $clientDatabaseEntity
        ]);
    }
}
