<?php

namespace backend\modules\api_test\domain\repository;

use backend\modules\api_test\domain\entity\ApiTestEntity;


interface ApiTestRepository {
    public function index();
    public function createApiTest(ApiTestEntity $apiTestEntity): ApiTestEntity;
    public function updateApiTest(ApiTestEntity $apiTestEntity): ApiTestEntity;
    public function removeApiTest(array $data): array;
}
