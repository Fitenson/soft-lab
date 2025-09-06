<?php

namespace backend\modules\auth\domain\usecase;

use backend\modules\auth\domain\entity\Auth;
use Yii;
use backend\modules\auth\domain\repository\AuthRepository;


class RegisterUseCase {
    private AuthRepository $authRepository;

    public function __construct()
    {
        $this->authRepository = Yii::$container->get(AuthRepository::class);
    }


    public function handle(array $data)
    {
        $auth = new Auth($data);

        return $this->authRepository->register($auth);
    }
}
