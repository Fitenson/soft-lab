<?php

namespace backend\modules\auth\data\repository;

use Yii;
use yii\web\NotFoundHttpException;

use backend\components\repository\BaseRepository;
use backend\modules\auth\domain\entity\Auth;
use backend\modules\auth\domain\repository\AuthRepository;
use backend\modules\user\data\models\User;


class YiiAuthRepository extends BaseRepository implements AuthRepository {
    public function login(Auth $auth): Auth
    {
        $checkUser = User::find()->where(['username' => $auth->getUsername()])->exists();

        if(empty($checkUser)) {
            Yii::$app->exception->throw('User not found', 404);
        }

        $User = User::findOne(['username' => $auth->getUsername()]);

        if (!$User || !$User->validatePassword($auth->getPassword())) {
            Yii::$app->exception->throw('Incorrect username or password', 401);
        }


        return new Auth([
            'username' => $User->username,
            'fullName' => $User->fullName,
            'email' => $User->email,
            'password' => $User->accessToken,            
        ]);
    }


    public function register(Auth $auth): Auth
    {
        $data = $auth->asArray();

        $User = new User();

        $User->load($data, '');
        $User->passwordHash = Yii::$app->security->generatePasswordHash($data['password']);
        $User->generateAuthKey();
        $User->generateAccessToken();
        $User->save(false);


        return new Auth([
            'username' => $User->username,
            'fullName' => $User->fullName,
            'email' => $User->email,
            'password' => $User->accessToken,
        ]);
    }
}
