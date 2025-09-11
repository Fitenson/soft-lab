<?php

namespace backend\modules\user\domain\usecase;

use backend\modules\user\domain\repository\UserRepository;


class IndexUserUseCase {
    private UserRepository $userRepository;


    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }


    public function execute(array $params)
    {
        return $this->userRepository->index($params);
    }
}
