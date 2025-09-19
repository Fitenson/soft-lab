<?php

namespace backend\modules\client_database\domain\usecase;

use backend\modules\client_database\domain\repository\ClientDatabaseRepository;


class IndexClientDatabaseUseCase {
    private ClientDatabaseRepository $clientDatabaseRepository;


    public function __construct(ClientDatabaseRepository $clientDatabaseRepository)
    {
        $this->clientDatabaseRepository = $clientDatabaseRepository;
    }


    public function execute(array $params)
    {
        return $this->clientDatabaseRepository->index($params);
    }
}
