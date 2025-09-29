<?php

namespace backend\modules\client_database\domain\usecase;

use backend\modules\client_database\domain\entity\ClientDatabaseEntity;
use backend\modules\client_database\domain\repository\ClientDatabaseRepository;


class ConnectClientDatabaseUseCase {
    private ClientDatabaseRepository $clientDatabaseRepository;


    public function __construct(ClientDatabaseRepository $clientDatabaseRepository)
    {
        $this->clientDatabaseRepository = $clientDatabaseRepository;
    }


    public function execute(string $id, ?string $refreshToken = null): ClientDatabaseEntity
    {
        return $this->clientDatabaseRepository->connect($id, $refreshToken);
    }
}
