<?php

namespace backend\modules\user\domain\usecase;

use Yii;
use backend\modules\user\data\models\User;
use backend\modules\user\domain\entity\UserEntity;


class CreateUserUseCase {
    public string $actionUUID;


    public function execute(UserEntity $userEntity): UserEntity
    {
        $_actionUUID = $this->actionUUID;
        $User = new User();

        $password = '88888888';
        $userDTO = $userEntity->asDTO();
        $User->load($userDTO->getAttributes(), '');
        $User->passwordHash = Yii::$app->security->generatePasswordHash($password);
        $User->generateAuthKey();
        $User->_actionUUID = $_actionUUID;
        $User->save(false);

        return new UserEntity($User->getAttributes());
    }
}
