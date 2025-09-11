<?php

namespace backend\modules\user\domain\usecase;

use backend\modules\user\data\dto\UserDTO;
use backend\modules\user\domain\repository\UserRepository;


class ViewUserUseCase {
    private UserRepository $userRepository;


    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }


    public function execute(string $id): UserDTO
    {
        $userEntity = $this->userRepository->view($id);
        return $userEntity->asDTO();
    }
}
