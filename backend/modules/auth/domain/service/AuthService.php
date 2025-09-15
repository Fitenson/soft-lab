<?php

namespace backend\modules\auth\domain\service;

use Yii;
use backend\components\exception\ApiException;
use backend\modules\auth\domain\entity\AuthEntity;
use backend\modules\auth\domain\usecase\LoginUseCase;
use backend\modules\auth\domain\usecase\LogoutUseCase;
use backend\modules\auth\domain\usecase\RegisterUseCase;


class AuthService {
    private RegisterUseCase $registerUseCase;
    private LoginUseCase $loginUseCase;
    private LogoutUseCase $logoutUseCase;


    public function __construct(RegisterUseCase $registerUseCase, LoginUseCase $loginUseCase, LogoutUseCase $logoutUseCase)
    {
        $this->registerUseCase = $registerUseCase;
        $this->loginUseCase = $loginUseCase;
        $this->logoutUseCase = $logoutUseCase;
    }


    public function register(AuthEntity $authEntity)
    {
        try {
            $transaction = Yii::$app->db->beginTransaction();
            $authDTO = $this->registerUseCase->execute($authEntity);
            $transaction->commit();
            return $authDTO;
        } catch(ApiException $error) {
            $transaction->rollBack();
            throw $error;
        }
    }


    public function login(AuthEntity $authEntity)
    {
        try {
            $transaction = Yii::$app->db->beginTransaction();
            $authDTO = $this->loginUseCase->execute($authEntity);
            $transaction->commit();
            return $authDTO;
        } catch(ApiException $error) {
            $transaction->rollBack();
            throw $error;
        }
    }


    public function logout(): bool
    {
        return $this->logoutUseCase->execute();
    }
}
