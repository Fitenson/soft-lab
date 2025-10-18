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


    public function execute(array $params): ClientDatabaseEntity
    {
        $id = !empty($params['id']) ? $params['id'] : null;
        $refreshToken = $params['refreshToken'];

        if(!empty($id)) {
            return $this->clientDatabaseRepository->findById($id);
        }

        return $this->clientDatabaseRepository->findByRefreshToken($refreshToken);
    }
}
