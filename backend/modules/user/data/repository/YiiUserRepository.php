<?php

namespace backend\modules\user\data\repository;

use Yii;
use backend\components\repository\BaseRepository;
use backend\modules\user\data\models\User;
use backend\modules\user\domain\entity\UserEntity;
use backend\modules\user\domain\repository\UserRepository;


class YiiUserRepository extends BaseRepository implements UserRepository {
    public function index(array $params)
    {
        $params = $this->getParams($params);
        $offset = $params['offset'];
        $sort = $params['sort'];
        $limit = $params['limit'];
        $valid = $params['valid'];
        $likeFilterFields = $params['likeFilterFields'];
        $compareFields = $params['compareFields'];

        $query =User::find()->selectIndex()
        ->where($valid)
        ->andWhere($compareFields)
        ->having($likeFilterFields);

        $total = $query->count();

        $Users = $query
        ->orderBy($sort)
        ->offset($offset)
        ->limit($limit)
        ->asArray()
        ->all();

        
        return [
            'total' => $total,
            'rows' => $Users
        ];
    }


    public function create(UserEntity $userEntity): UserEntity
    {
        $_actionUUID = $this->getActionUUID();

        $userDTO = $userEntity->asDTO();
        $password = '88888888';
        $User = new User();
        $User->load($userDTO->getAttributes(), '');
        $User->passwordHash = Yii::$app->security->generatePasswordHash($password);
        $User->generateAuthKey();
        $User->_actionUUID = $_actionUUID;

        if(!$User->save(false)) {
            Yii::$app->exception->throw($User->getErrors(), 500);
        }
        
        return new UserEntity($User->getAttributes());
    }


    public function update(UserEntity $userEntity): UserEntity
    {
        $_actionUUID = $this->getActionUUID();
        $userDTO = $userEntity->asDTO();
        $User = User::findOne($userDTO->UUID);

        $User->load($userDTO->getAttributes(), '');
        $User->_actionUUID = $_actionUUID;

        if(!$User->save(false)) {
            Yii::$app->exception->throw('Failed to save user data', 500);
        }

        return new UserEntity($User->getAttributes());
    }


    public function view(string $id): UserEntity
    {
        $User = User::find()
        ->selectIndex()
        ->where(['UUID' => $id])
        ->asArray()
        ->one();

        return new UserEntity($User);
    }


    public function remove(array $data)
    {
        
    }
}
