<?php

namespace backend\modules\auth\domain\service;

use backend\modules\auth\domain\entity\Auth;
use backend\modules\auth\domain\usecase\LoginUseCase;
use backend\modules\auth\domain\usecase\RegisterUseCase;

class AuthService {
    private RegisterUseCase $registerUseCase;
    private LoginUseCase $loginUseCase;


    public function __construct(RegisterUseCase $registerUseCase, LoginUseCase $loginUseCase)
    {
        $this->registerUseCase = $registerUseCase;
        $this->loginUseCase = $loginUseCase;
    }


    public function register(Auth $auth)
    {
        return $this->registerUseCase->execute($auth);
    }


    public function login(Auth $auth): Auth
    {
        return $this->loginUseCase->execute($auth);
    }
}
