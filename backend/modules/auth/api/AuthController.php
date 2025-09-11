<?php

namespace backend\modules\auth\api;

use Yii;

use yii\filters\auth\HttpBasicAuth;

use backend\controllers\RestController;
use backend\modules\auth\domain\entity\AuthEntity;
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

        $behaviours['authenticator'] = [
            'class' => HttpBasicAuth::class,
            'only' => ['logout']
        ];

        return $behaviours;
    }


    public function actionLogin()
    {
        $data = Yii::$app->request->post();

        $form = new LoginForm();
        $form->load($data, '');

        if(!$form->validate()) {
            Yii::$app->exception->throw($form->getErrors(), 422);
        }

        $data = $form->asArray();
        $authDTO = $this->authService->login(new AuthEntity($data));

        return $authDTO->asArray();
    }


    public function actionRegister() 
    {
        $form = new RegisterForm();
        $form->load(Yii::$app->request->post(), '');

        if (!$form->validate()) {
            return Yii::$app->exception->throw($form->getErrors(), 422);
        }

        $data = $form->asArray();
        $authDTO = $this->authService->register(new AuthEntity($data));

        return $authDTO->asArray();
    }


    public function actionLogout() {
        return $this->authService->logout();
    }
}
