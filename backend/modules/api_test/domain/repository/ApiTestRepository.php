<?php

namespace backend\modules\api_test\domain\repository;

use backend\modules\api_test\domain\entity\ApiTestEntity;
use backend\modules\api_test\domain\entity\ApiTestHasDataEntity;
use backend\modules\client_database\domain\entity\ClientDatabaseEntity;

interface ApiTestRepository {
    public function index();

    /**
    * @param array{
    *     apiTestEntity: ApiTestEntity,
    *     clientDatabaseToken: string
    * } $params
     * 
     *  @return ApiTestEntity
    */
    public function createApiTest(array $params): ApiTestEntity;


    /**
    * @param array{
    *     apiTestEntity: ApiTestEntity,
    *     clientDatabaseToken: string
    * } $params
     * 
     *  @return ApiTestEntity
    */
    public function updateApiTest(array $params): ApiTestEntity;
    public function removeApiTest(array $data): array;

    /**
    * @param array{
    *     apiTestHasDataEntities: ApiTestHasDataEntity[],
    * } $params
     * 
     *  @return ApiTestHasDataEntity[]
    */
    public function createApiTestHasData(array $params): array;
}
