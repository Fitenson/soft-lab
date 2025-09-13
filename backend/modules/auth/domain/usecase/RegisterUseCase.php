<?php

namespace backend\modules\auth\domain\usecase;

use Yii;
use backend\modules\auth\data\dto\AuthDTO;
use backend\modules\auth\domain\entity\AuthEntity;
use backend\modules\auth\domain\repository\AuthRepository;


class RegisterUseCase {
    private AuthRepository $authRepository;

    public function __construct()
    {
        $this->authRepository = Yii::$container->get(AuthRepository::class);
    }


    public function execute(AuthEntity $authEntity): AuthDTO
    {
        try {
            $transaction = Yii::$app->db->beginTransaction();
            $newAuthEntity = $this->authRepository->register($authEntity);
            $transaction->commit();

            return $newAuthEntity->asDTO();
        } catch(\Throwable $error) {
            $transaction->rollBack();
            return Yii::$app->exception->throw($error->getMessage(), 422);
        }
    }
}
