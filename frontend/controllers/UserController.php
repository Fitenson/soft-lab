<?php

namespace frontend\controllers;

use common\components\inertia\InertiaController;


class UserController extends InertiaController {
    public function actionIndex()
    {
        return $this->inertia('user/index');
    }


    public function actionCreate()
    {
        return $this->inertia('user/create');
    }


    public function actionUpdate(string $id)
    {
        return $this->inertia('user/form', []);
    }
}
