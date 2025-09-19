<?php

namespace backend\modules\client_database\domain\usecase;

use backend\modules\client_database\domain\entity\ClientDatabaseEntity;
use backend\modules\client_database\domain\repository\ClientDatabaseRepository;


class CreateClientDatabaseUseCase {
    private ClientDatabaseRepository $clientDatabaseRepository;

    public function __construct(ClientDatabaseRepository $clientDatabaseRepository)
    {
        $this->clientDatabaseRepository = $clientDatabaseRepository;
    }


    public function execute(ClientDatabaseEntity $clientDatabaseEntity): ClientDatabaseEntity
    {
        return $this->clientDatabaseRepository->create($clientDatabaseEntity);
    }
}
