<?php

namespace frontend\controllers\auth;

use frontend\controllers\InertiaController;


class AuthController extends InertiaController {
    public function actionLogin()
    {
        return $this->inertia('auth/login');
    }
}
