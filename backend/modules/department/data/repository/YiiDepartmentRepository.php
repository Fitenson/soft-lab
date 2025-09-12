<?php

namespace backend\modules\department\data\repository;

use Yii;
use backend\components\repository\BaseRepository;
use backend\modules\user\data\models\User;
use backend\modules\user\domain\entity\UserEntity;
use backend\modules\department\domain\repository\DepartmentRepository;


class YiiDepartmentRepository extends BaseRepository implements DepartmentRepository {
    private string $_actionUUID;

    public function setActionUUID(): void
    {
        $this->_actionUUID = Yii::$app->db->createCommand('select UUID()')->queryScalar();
    }

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
        $actionUUID = $this->_actionUUID;

        $userData = $userEntity->asArray();
        $userData['password'] = '88888888';
        $User = new User();
        $User->load($userData, '');
        $User->passwordHash = Yii::$app->security->generatePasswordHash($userData['password']);
        $User->generateAuthKey();
        $User->_actionUUID = $actionUUID;

        if(!$User->save(false)) {
            Yii::$app->exception->throw('Failed to save user data', 500);
        }
        
        return new UserEntity($User->attributes());
    }


    public function update(UserEntity $userEntity): UserEntity
    {
        $actionUUID = $this->_actionUUID;
        $userData = $userEntity->asArray();
        $User = User::findOne($userData['UUID']);

        $User->load($userData, '');
        $User->_actionUUID = $actionUUID;

        if(!$User->save(false)) {
            Yii::$app->exception->throw('Failed to save user data', 500);
        }

        return new UserEntity($User->attributes());
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
