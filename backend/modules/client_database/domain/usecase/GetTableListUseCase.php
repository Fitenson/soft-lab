<?php

namespace backend\modules\client_database\domain\usecase;

use backend\modules\client_database\domain\repository\ClientDatabaseRepository;


class GetTableListUseCase {
    private ClientDatabaseRepository $clientDatabaseRepository;

    public function __construct(ClientDatabaseRepository $clientDatabaseRepository)
    {
        $this->clientDatabaseRepository = $clientDatabaseRepository;
    }


    public function execute(array $params, string $refreshToken, $strategy = 'list')
    {
        if($strategy != 'list') {
            return $this->getTableDetails($params, $refreshToken);
        }

        return $this->getTableList($params, $refreshToken);
    }


    private function getTableDetails(array $params, string $refreshToken)
    {
        return $this->clientDatabaseRepository->getClientTable($params, $refreshToken);
    }


    private function getTableList(array $params, string $refreshToken) 
    {
        return $this->clientDatabaseRepository->getClientTableList($params, $refreshToken);
    }
}
