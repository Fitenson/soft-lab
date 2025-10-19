<?php

namespace backend\modules\client_database\domain\repository;

use backend\modules\client_database\domain\entity\ClientDatabaseEntity;


interface ClientDatabaseRepository {
    public function index();
    public function create(ClientDatabaseEntity $clientDatabaseEntity): ClientDatabaseEntity;
    public function update(ClientDatabaseEntity $clientDatabaseEntity): ClientDatabaseEntity;
    public function remove(array $data): array;
    public function findById(string $id): ClientDatabaseEntity;
    public function findByRefreshToken(string $refreshToken): ClientDatabaseEntity;
    public function generateRefreshToken(string $id);
    public function connect(array $params): ClientDatabaseEntity;
    public function loginClientDatabase(string $id, $password): ClientDatabaseEntity;
    public function getClientTable(array $params, string $refreshToken): array;
    public function getClientTableList(array $params, string $refreshToken): array;
}
