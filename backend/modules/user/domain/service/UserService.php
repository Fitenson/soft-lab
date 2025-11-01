<?php

namespace backend\modules\user\domain\service;

use Yii;
use Throwable;
use backend\components\exception\ApiException;
use backend\components\service\BaseService;
use backend\modules\user\data\dto\UserDTO;
use backend\modules\user\domain\entity\UserEntity;
use backend\modules\user\data\models\User;
use backend\modules\user\domain\usecase\CreateUserUseCase;
use backend\modules\user\domain\usecase\UpdateUserUseCase;
use backend\modules\user\domain\usecase\RemoveUserUseCase;


class UserService extends BaseService {
    private CreateUserUseCase $createUserUseCase;
    private UpdateUserUseCase $updateUserUseCase;
    private RemoveUserUseCase $removeUserUseCase;


    public function __construct(
        CreateUserUseCase $createUserUseCase,
        UpdateUserUseCase $updateUserUseCase,
        RemoveUserUseCase $removeUserUseCase
    )
    {
        $this->createUserUseCase = $createUserUseCase;
        $this->updateUserUseCase = $updateUserUseCase;
        $this->removeUserUseCase = $removeUserUseCase;
    }


    public function index(array $params) {
        $params = $this->getParams($params);

        $offset = $params['offset'];
        $sort = $params['sort'];
        $limit = $params['limit'];
        $valid = $params['valid'];
        $likeFilterFields = $params['likeFilterFields'];
        $compareFields = $params['compareFields'];

        $query = User::find()->selectIndex()
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


    public function createUser(UserEntity $userEntity): UserDTO
    {
        try {
            $transaction = Yii::$app->db->beginTransaction();
            $this->createUserUseCase->actionUUID = $this->getActionUUID();
            $userEntity = $this->createUserUseCase->execute($userEntity);
            $transaction->commit();
            return $userEntity->asDTO();
        } catch(ApiException $error) {
            $transaction->rollBack();
            Yii::$app->exception->throw($error->getMessage(), 500);
            return new UserDTO();
        }
    }


    public function updateUser(UserEntity $userEntity): UserDTO
    {
        try {
            $transaction = Yii::$app->db->beginTransaction();
            $this->updateUserUseCase->actionUUID = $this->getActionUUID();
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
        $User = User::find()
        ->selectIndex()
        ->where(['UUID' => $id])
        ->asArray()
        ->one();

        $userEntity = new UserEntity($User);

        return $userEntity->asDTO();
    }


    public function removeUser(array $data): array
    {
        $this->removeUserUseCase->actionUUID = $this->getActionUUID();
        return $this->removeUserUseCase->execute($data);
    }
}
