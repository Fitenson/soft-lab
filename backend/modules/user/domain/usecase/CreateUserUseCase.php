<?php

namespace backend\modules\user\domain\usecase;

use backend\modules\user\domain\entity\UserEntity;
use backend\modules\user\domain\repository\UserRepository;


class CreateUserUseCase {
    private UserRepository $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }


    public function execute(UserEntity $userEntity): UserEntity
    {
        return $this->userRepository->create($userEntity);
    }
}
