<?php

namespace backend\modules\user\domain\usecase;

use backend\modules\user\data\models\User;
use backend\modules\user\domain\entity\UserEntity;


class UpdateUserUseCase {
    public string $actionUUID;


    public function execute(UserEntity $userEntity): UserEntity
    {
        $_actionUUID = $this->actionUUID;
        $userDTO = $userEntity->asDTO();

        $User = User::findOne($userDTO->UUID);
        $User->_actionUUID = $_actionUUID;
        $User->load($userDTO->asArray(), '');
        $User->save(false);

        return new UserEntity($User->getAttributes());
    }
}
