<?php

namespace backend\modules\user\domain\usecase;

use Yii;
use Throwable;
use backend\modules\user\domain\entity\UserEntity;
use backend\modules\user\domain\repository\UserRepository;


class UpdateUserUseCase {
    private UserRepository $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }


    public function execute(UserEntity $userEntity)
    {
        try {
            $newUserEntity = $this->userRepository->update($userEntity);
            return $newUserEntity->asDTO();
        } catch(Throwable $error) {
            Yii::$app->exception->throw($error->getMessage(), 422);
        }
    }
}
