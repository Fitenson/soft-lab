<?php

namespace backend\modules\auth\api;

use Yii;

use backend\controllers\RestController;
use backend\modules\auth\domain\entity\Auth;
use backend\modules\auth\domain\service\AuthService;
use backend\modules\auth\form\LoginForm;
use backend\modules\auth\form\RegisterForm;


class AuthController extends RestController {
    private AuthService $authService;

    public function init()
    {
        parent::init();
        $this->authService = Yii::$container->get(AuthService::class);
    }

    public function behaviors()
    {
        $behaviours = parent::behaviors();
        unset($behaviours['authenticator']);
        return $behaviours;
    }


    public function actionLogin()
    {
        $data = Yii::$app->request->post();

        $form = new LoginForm();
        $form->load($data, '');

        if(!$form->validate()) {
            Yii::$app->exception->throw('Validation failed', 422);
        }

        $data = $form->asArray();
        $auth = $this->authService->login(new Auth($data));

        return $auth;
    }


    public function actionRegister() 
    {
        $form = new RegisterForm();
        $form->load(Yii::$app->request->post(), '');

        if (!$form->validate()) {
            return Yii::$app->exception->throw($form->getErrors(), 422);
        }

        // echo '<pre>';
        // print_r($form->getErrors());
        // die;

        $data = $form->asArray();
        $auth = $this->authService->register(new Auth($data));

        $auth = $auth->asArray();

        return $auth;
    }
}
