<?php

namespace backend\modules\auth\domain\usecase;

use Yii;
use backend\modules\auth\domain\entity\AuthEntity;
use backend\modules\auth\domain\repository\AuthRepository;


class RegisterUseCase {
    private AuthRepository $authRepository;

    public function __construct()
    {
        $this->authRepository = Yii::$container->get(AuthRepository::class);
    }


    public function execute(AuthEntity $authEntity)
    {
        try {
            $transaction = Yii::$app->db->beginTransaction();
            $authEntity = $this->authRepository->register($authEntity);
            $transaction->commit();

            return $authEntity;
        } catch(\Exception $error) {
            $transaction->rollBack();
            return Yii::$app->exception->throw($error->getMessage(), 422);
        }
    }
}
