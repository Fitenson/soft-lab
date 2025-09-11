<?php

namespace backend\modules\auth\data\repository;

use Yii;

use backend\components\repository\BaseRepository;
use backend\modules\auth\domain\entity\Auth;
use backend\modules\auth\domain\repository\AuthRepository;
use backend\modules\user\data\models\User;


class YiiAuthRepository extends BaseRepository implements AuthRepository {
    private string $actionUUID;

    public function setActionUUID() {
        $this->actionUUID = Yii::$app->db->createCommand('select UUID()')->queryScalar();
    }


    public function login(Auth $auth): Auth
    {
        $checkUser = User::find()->where(['username' => $auth->getUsername()])->exists();

        if(empty($checkUser)) {
            Yii::$app->exception->throw('Incorrect username or password', 401);
        }

        $User = User::findOne(['username' => $auth->getUsername()]);

        if (!$User || !$User->validatePassword($auth->getPassword())) {
            Yii::$app->exception->throw('Incorrect username or password', 401);
        }

        $User->_actionUUID = $this->actionUUID;
        $User->generateAccessToken();
        $User->saveQuietly(false);

        Yii::$app->user->login($User);

        return new Auth([
            'UUID' => $User->UUID,
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
        
        if(!$User->save(false)) {
            Yii::$app->exception->throw($User->getErrors(), 500);
        }

        return new Auth([
            'UUID' => $User->UUID,
            'username' => $User->username,
            'fullName' => $User->fullName,
            'email' => $User->email,
            'password' => $User->accessToken,
        ]);
    }


    public function logout(): bool
    {
        $User = User::findOne(['username' => Yii::$app->user->identity->username]);
        $User->accessToken = null;
        Yii::$app->user->logout($User);

        return $User->save(false);
    }
}
