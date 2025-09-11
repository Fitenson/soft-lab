<?php

namespace backend\modules\auth\domain\usecase;

use Yii;
use backend\modules\auth\domain\entity\Auth;
use backend\modules\auth\domain\repository\AuthRepository;


class LoginUseCase {
    private AuthRepository $authRepository;

    public function __construct(AuthRepository $authRepository)
    {
        $this->authRepository = $authRepository;
    }


    public function execute(Auth $auth) {
        $this->authRepository->setActionUUID();
        return $this->authRepository->login($auth);
    }
}
