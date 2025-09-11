<?php

namespace backend\modules\auth\domain\service;

use backend\modules\auth\domain\entity\AuthEntity;
use backend\modules\auth\domain\usecase\LoginUseCase;
use backend\modules\auth\domain\usecase\LogoutUseCase;
use backend\modules\auth\domain\usecase\RegisterUseCase;

class AuthService {
    private RegisterUseCase $registerUseCase;
    private LoginUseCase $loginUseCase;
    private LogoutUseCase $logoutUseCase;


    public function __construct(RegisterUseCase $registerUseCase, LoginUseCase $loginUseCase, LogoutUseCase $logoutUseCase)
    {
        $this->registerUseCase = $registerUseCase;
        $this->loginUseCase = $loginUseCase;
        $this->logoutUseCase = $logoutUseCase;
    }


    public function register(AuthEntity $authEntity)
    {
        return $this->registerUseCase->execute($authEntity);
    }


    public function login(AuthEntity $authEntity): AuthEntity
    {
        return $this->loginUseCase->execute($authEntity);
    }


    public function logout(): bool
    {
        return $this->logoutUseCase->execute();
    }
}
