<?php

namespace backend\modules\auth\api;

use backend\controllers\RestController;
use backend\modules\auth\form\RegisterForm;
use Yii;
use yii\web\UnprocessableEntityHttpException;

class AuthController extends RestController {
    public function actionLogin()
    {

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

        return [];
    }
}
