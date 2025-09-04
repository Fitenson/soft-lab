<?php

namespace frontend\controllers;

use common\components\inertia\InertiaController;


class AuthController extends InertiaController {
    public function actionLogin()
    {
        return $this->inertia('auth/login');
    }


    public function actionRegister()
    {
        return $this->inertia('auth/register');
    }
}
