<?php

namespace backend\modules\client_database\domain\repository;

use backend\modules\client_database\domain\entity\ClientDatabaseEntity;


interface ClientDatabaseRepository {
    public function index();
    public function create(ClientDatabaseEntity $clientDatabaseEntity): ClientDatabaseEntity;
    public function update(ClientDatabaseEntity $clientDatabaseEntity): ClientDatabaseEntity;
    public function view(string $id): ClientDatabaseEntity;
    public function remove(array $data): array;
}
