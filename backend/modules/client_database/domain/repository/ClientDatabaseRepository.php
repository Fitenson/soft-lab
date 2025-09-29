<?php

namespace backend\modules\client_database\domain\repository;

use backend\modules\client_database\domain\entity\ClientDatabaseEntity;


interface ClientDatabaseRepository {
    public function index();
    public function create(ClientDatabaseEntity $clientDatabaseEntity): ClientDatabaseEntity;
    public function update(ClientDatabaseEntity $clientDatabaseEntity): ClientDatabaseEntity;
    public function remove(array $data): array;
    public function getClientRefreshToken(string $id, ?string $token = null);
    public function connect(string $id, ?string $refreshToken = null): ClientDatabaseEntity;
    public function loginClientDatabase(string $id, $password): ClientDatabaseEntity;
}
