<?php

namespace backend\modules\client_database\domain\usecase;

use backend\modules\client_database\domain\entity\ClientDatabaseEntity;
use backend\modules\client_database\domain\repository\ClientDatabaseRepository;


class LoginClientDatabaseUseCase {
    private ClientDatabaseRepository $clientDatabaseRepository;


    public function __construct(ClientDatabaseRepository $clientDatabaseRepository)
    {
        $this->clientDatabaseRepository = $clientDatabaseRepository;
    }


    public function execute(string $id, string $password): ClientDatabaseEntity
    {
        $clientDatabaseEntity = $this->clientDatabaseRepository->loginClientDatabase($id, $password);
        return $clientDatabaseEntity;
    }
}
