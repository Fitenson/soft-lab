<?php

namespace backend\modules\auth\domain\usecase;

use backend\modules\auth\domain\repository\AuthRepository;


class LogoutUseCase {
    private AuthRepository $authRepository;

    public function __construct(AuthRepository $authRepository)
    {
        $this->authRepository = $authRepository;
    }


    public function execute(): bool
    {
        return $this->authRepository->logout();
    }
}
