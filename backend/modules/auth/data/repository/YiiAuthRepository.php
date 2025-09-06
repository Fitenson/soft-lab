<?php

namespace backend\modules\auth\data\repository;

use backend\components\repository\BaseRepository;
use backend\modules\auth\domain\entity\Auth;
use backend\modules\auth\domain\repository\AuthRepository;
use backend\modules\user\User;
use Yii;

class YiiAuthRepository extends BaseRepository implements AuthRepository {
    public function login(Auth $auth)
    {
        
    }


    public function register(Auth $auth)
    {
        $data = $auth->toArray();

        $User = new User();

        $User->load($data, '');
        $User->passwordHash = Yii::$app->security->generatePasswordHash($data['password']);
        $User->generateAuthKey();
    }
}
