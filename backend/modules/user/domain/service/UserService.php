<?php

namespace backend\modules\user\domain\service;

use Yii;
use backend\components\exception\ApiException;

use backend\modules\user\data\dto\UserDTO;
use backend\modules\user\domain\entity\UserEntity;
use backend\modules\user\domain\usecase\CreateUserUseCase;
use backend\modules\user\domain\usecase\IndexUserUseCase;
use backend\modules\user\domain\usecase\UpdateUserUseCase;
use backend\modules\user\domain\usecase\RemoveUserUseCase;
use backend\modules\user\domain\usecase\ViewUserUseCase;


class UserService {
    private IndexUserUseCase $indexUserUseCase;
    private CreateUserUseCase $createUserUseCase;
    private UpdateUserUseCase $updateUserUseCase;
    private ViewUserUseCase $viewUserUseCase;
    private RemoveUserUseCase $removeUserUseCase;


    public function __construct(
        IndexUserUseCase $indexUserUseCase,
        CreateUserUseCase $createUserUseCase,
        UpdateUserUseCase $updateUserUseCase,
        ViewUserUseCase $viewUserUseCase,
        RemoveUserUseCase $removeUserUseCase
    )
    {
        $this->indexUserUseCase = $indexUserUseCase;
        $this->createUserUseCase = $createUserUseCase;
        $this->updateUserUseCase = $updateUserUseCase;
        $this->viewUserUseCase = $viewUserUseCase;
        $this->removeUserUseCase = $removeUserUseCase;
    }


    public function index(array $params) {
        return $this->indexUserUseCase->execute($params);
    }


    public function createUser(UserEntity $userEntity): UserDTO
    {
        try {
            $transaction = Yii::$app->db->beginTransaction();
            $userEntity = $this->createUserUseCase->execute($userEntity);
            $transaction->commit();
            return $userEntity->asDTO();
        } catch(ApiException $error) {
            $transaction->rollBack();
            throw $error;
            return new UserDTO();
        }
    }


    public function updateUser(UserEntity $userEntity): UserDTO
    {
        try {
            $transaction = Yii::$app->db->beginTransaction();
            $userEntity = $this->updateUserUseCase->execute($userEntity);
            $transaction->commit();
            return $userEntity->asDTO();
        } catch(ApiException $error) {
            $transaction->rollBack();
            throw $error;
            return new UserDTO();
        }
    }

    
    public function viewUser(string $id): UserDTO
    {
        return $this->viewUserUseCase->execute($id);
    }


    public function removeUser(array $data): array
    {
        return $this->removeUserUseCase->execute($data);
    }
}
