<?php

namespace backend\modules\user\domain\service;
use Yii;

use backend\modules\user\domain\entity\UserEntity;
use backend\modules\user\domain\usecase\CreateUserUseCase;
use backend\modules\user\domain\usecase\IndexUserUseCase;
use backend\modules\user\domain\usecase\UpdateUserUseCase;
use backend\modules\user\data\dto\UserDTO;
use backend\modules\user\domain\repository\UserRepository;
use backend\modules\user\domain\usecase\ViewUserUseCase;

class UserService {
    private UserRepository $userRepository;
    
    private IndexUserUseCase $indexUserUseCase;
    private CreateUserUseCase $createUserUseCase;
    private UpdateUserUseCase $updateUserUseCase;
    private ViewUserUseCase $viewUserUseCase;


    public function __construct(
        UserRepository $userRepository,

        IndexUserUseCase $indexUserUseCase,
        CreateUserUseCase $createUserUseCase,
        UpdateUserUseCase $updateUserUseCase,
        ViewUserUseCase $viewUserUseCase
    )
    {
        $this->indexUserUseCase = $indexUserUseCase;
        $this->createUserUseCase = $createUserUseCase;
        $this->updateUserUseCase = $updateUserUseCase;
        $this->viewUserUseCase = $viewUserUseCase;
    }


    public function index(array $params) {
        return $this->indexUserUseCase->execute($params);
    }


    public function createUser(UserEntity $userEntity): UserDTO
    {
        return $this->createUserUseCase->execute($userEntity);
    }


    public function updateUser(UserEntity $userEntity): UserDTO
    {
        return $this->updateUserUseCase->execute($userEntity);
    }

    
    public function viewUser(string $id): UserDTO
    {
        return $this->viewUserUseCase->execute($id);
    }
}
