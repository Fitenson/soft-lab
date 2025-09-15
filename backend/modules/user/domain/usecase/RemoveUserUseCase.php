<?php

namespace backend\modules\user\domain\usecase;

use backend\modules\user\domain\repository\UserRepository;


class RemoveUserUseCase {
    private UserRepository $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }


    public function execute(array $data): array
    {
        return $this->userRepository->remove($data);
    }
}
