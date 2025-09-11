<?php

namespace backend\modules\auth\domain\usecase;

use Yii;
use backend\modules\auth\data\dto\AuthDTO;
use backend\modules\auth\domain\entity\AuthEntity;
use backend\modules\auth\domain\repository\AuthRepository;


class LoginUseCase {
    private AuthRepository $authRepository;

    public function __construct(AuthRepository $authRepository)
    {
        $this->authRepository = $authRepository;
    }


    public function execute(AuthEntity $authEntity): AuthDTO
    {
        $this->authRepository->setActionUUID();

        $authEntity = $this->authRepository->login($authEntity);
        return $authEntity->asDto();
    }
}
