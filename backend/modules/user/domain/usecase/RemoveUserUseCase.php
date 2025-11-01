<?php

namespace backend\modules\user\domain\usecase;

use Yii;
use Throwable;
use backend\modules\user\data\models\User;
use backend\modules\user\data\dto\UserDTO;


class RemoveUserUseCase {
    public string $actionUUID;


    public function execute(array $data): array
    {
        $_actionUUID = $this->actionUUID;

        $status = [
            'success' => [],
            'failed' => []
        ];

        $UUIDs = $data['UUIDs'];
        $Users = User::find()->where(['UUID' => $UUIDs])->all();

        foreach($Users as $User) {
            try {
                $transaction = Yii::$app->db->beginTransaction();
                $User->_actionUUID = $_actionUUID;
                $User->delete();
                $transaction->commit();

                $userDTO = new UserDTO();
                $userDTO->load($User->getAttributes(), '');
                $status['success'][] = $userDTO;
            } catch(Throwable $error) {
                $transaction->rollBack();

                $userDTO = new UserDTO();
                $userDTO->load($User->getAttributes(), '');
                $status['failed'][] = $userDTO;
                $status['failed']['message'] = $error->getMessage();
            }
        }

        return $status;
    }
}
