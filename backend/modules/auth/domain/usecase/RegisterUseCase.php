<?php

namespace backend\modules\auth\domain\usecase;

use Yii;
use backend\modules\auth\data\dto\AuthDTO;
use backend\modules\auth\domain\entity\AuthEntity;
use backend\modules\auth\domain\repository\AuthRepository;


class RegisterUseCase {
    private AuthRepository $authRepository;

    public function __construct()
    {
        $this->authRepository = Yii::$container->get(AuthRepository::class);
    }


    public function execute(AuthEntity $authEntity): AuthDTO
    {
        $newAuthEntity = $this->authRepository->register($authEntity);
        return $newAuthEntity->asDTO();
    }
}
