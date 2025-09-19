<?php

namespace backend\modules\client_database\domain\usecase;

use backend\modules\client_database\domain\repository\ClientDatabaseRepository;


class RemoveClientDatabaseUseCase {
    private ClientDatabaseRepository $clientDatabaseRepository;

    public function __construct(ClientDatabaseRepository $clientDatabaseRepository)
    {
        $this->clientDatabaseRepository = $clientDatabaseRepository;
    }


    public function execute(array $data): array
    {
        return $this->clientDatabaseRepository->remove($data);
    }
}
