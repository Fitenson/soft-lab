<?php

namespace backend\modules\api_test\domain\repository;

use backend\modules\api_test\domain\entity\ApiTestEntity;
use backend\modules\client_database\domain\entity\ClientDatabaseEntity;

interface ApiTestRepository {
    public function index();
    public function createApiTest(ApiTestEntity $apiTestEntity, ClientDatabaseEntity $clientDatabaseEntity): ApiTestEntity;
    public function updateApiTest(ApiTestEntity $apiTestEntity, ClientDatabaseEntity $clientDatabaseEntity): ApiTestEntity;
    public function removeApiTest(array $data): array;
}
