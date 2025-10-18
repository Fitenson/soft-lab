<?php

namespace backend\modules\client_database\domain\usecase;

use backend\modules\client_database\domain\repository\ClientDatabaseRepository;


class GetClientRefreshTokenUseCase {
    private ClientDatabaseRepository $clientDatabaseRepository;


    public function __construct(ClientDatabaseRepository $clientDatabaseRepository)
    {
        $this->clientDatabaseRepository = $clientDatabaseRepository;
    }


    public function execute(string $id): string
    {
        return $this->clientDatabaseRepository->generateRefreshToken($id);
    }
}
