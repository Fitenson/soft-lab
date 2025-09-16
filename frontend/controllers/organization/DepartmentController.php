<?php

namespace frontend\controllers;

use common\components\inertia\InertiaController;


class DepartmentController extends InertiaController {
    public function actionIndex() {
        return $this->inertia('department/index');
    }

    
    public function actionCreate() {
        return $this->inertia('department/create');
    }


    public function actionView() {
        return $this->inertia('department/view');
    }
}
