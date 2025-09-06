<?php

namespace backend\modules\auth\api;

use Yii;
use yii\web\UnprocessableEntityHttpException;

use backend\controllers\RestController;
use backend\modules\auth\domain\entity\Auth;
use backend\modules\auth\domain\service\AuthService;
use backend\modules\auth\form\LoginForm;
use backend\modules\auth\form\RegisterForm;


class AuthController extends RestController {
    private AuthService $authService;


    public function __construct($id, $module = 'test', AuthService $authService, $config = [])
    {
        $this->authService = $authService;
    }


    public function actionLogin()
    {
        $data = Yii::$app->request->post();

        $form = new LoginForm();
        $form->load($data, '');

        if(!$form->validate()) {
            Yii::$app->exception->throw('Validation failed', 422);
        }

        $data = $form->toDto();
        $auth = $this->authService->login(new Auth($data));

        return $auth;
    }


    public function actionRegister() 
    {
        $data = Yii::$app->request->post();

        $form = new RegisterForm();
        $form->load($data, '');

        if(!$form->validate()) {
            throw new UnprocessableEntityHttpException('Validation failed');
        }

        $data = $form->toDto();
        $auth = $this->authService->register(new Auth($data));

        return $auth;
    }
}
