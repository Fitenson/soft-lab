<?php

namespace backend\modules\client_database\domain\usecase;

use backend\modules\client_database\data\dto\ClientDatabaseDTO;
use backend\modules\client_database\domain\repository\ClientDatabaseRepository;


class ViewClientDatabaseUseCase {
    private ClientDatabaseRepository $clientDatabaseRepository;


    public function __construct(ClientDatabaseRepository $clientDatabaseRepository)
    {
        $this->clientDatabaseRepository = $clientDatabaseRepository;
    }


    public function execute(string $id): ClientDatabaseDTO
    {
        $clientDatabaseEntity = $this->clientDatabaseRepository->view($id);
        return $clientDatabaseEntity->asDTO();
    }
}
