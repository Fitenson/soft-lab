<?php

namespace backend\modules\auth\domain\usecase;

use Yii;
use backend\modules\auth\domain\entity\AuthEntity;
use backend\modules\auth\domain\repository\AuthRepository;


class LoginUseCase {
    private AuthRepository $authRepository;

    public function __construct(AuthRepository $authRepository)
    {
        $this->authRepository = $authRepository;
    }


    public function execute(AuthEntity $authEntity) {
        $this->authRepository->setActionUUID();
        return $this->authRepository->login($authEntity);
    }
}
