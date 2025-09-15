<?php

namespace backend\modules\auth\data\repository;

use Yii;

use backend\components\repository\BaseRepository;
use backend\modules\auth\domain\entity\AuthEntity;
use backend\modules\auth\domain\repository\AuthRepository;
use backend\modules\user\data\models\User;


class YiiAuthRepository extends BaseRepository implements AuthRepository {
    private string $_actionUUID;

    public function setActionUUID() {
        $this->_actionUUID = Yii::$app->db->createCommand('select UUID()')->queryScalar();
    }


    public function login(AuthEntity $authEntity): AuthEntity
    {
        $authDTO = $authEntity->asDTO();
        $checkUser = User::find()->where(['username' => $authDTO->username])->exists();

        if(empty($checkUser)) {
            Yii::$app->exception->throw([
                'password' => 'Incorrect username or password'
            ], 401);
        }

        $User = User::findOne(['username' => $authDTO->username]);

        if (!$User || !$User->validatePassword($authDTO->password)) {
            Yii::$app->exception->throw([
                'password' => [
                    'Incorrect username or password'
                ]
            ], 401);
        }

        // $User->_actionUUID = $this->actionUUID;
        $token = $User->generateAccessToken();
        $User->saveQuietly(false);

        Yii::$app->user->login($User);

        return new AuthEntity([
            'UUID' => $User->UUID,
            'username' => $User->username,
            'fullName' => $User->fullName,
            'email' => $User->email,
            'password' => $token,
        ]);
    }


    public function register(AuthEntity $authEntity): AuthEntity
    {
        $data = $authEntity->asArray();

        $User = new User();

        $User->load($data, '');
        $User->passwordHash = Yii::$app->security->generatePasswordHash($data['password']);
        $User->generateAuthKey();
        $token = $User->generateAccessToken();
        $User->UUID = Yii::$app->db->createCommand('select UUID()')->queryScalar();
        $User->valid = true;
        $User->_version = 1;
        $User->createdAt = strtotime('now');;
        
        if(!$User->saveQuietly(false)) {
            Yii::$app->exception->throw($User->getErrors(), 500);
        }

        return new AuthEntity([
            'UUID' => $User->UUID,
            'username' => $User->username,
            'fullName' => $User->fullName,
            'email' => $User->email,
            'password' => $token,
        ]);
    }


    public function logout(): bool
    {
        $User = User::findOne(['username' => Yii::$app->user->identity->username]);
        $User->accessToken = null;
        Yii::$app->user->logout($User);

        return $User->saveQuietly(false);
    }
}
