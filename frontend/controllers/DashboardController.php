<?php

namespace frontend\controllers;

use common\components\inertia\InertiaController;


class DashboardController extends InertiaController {
    public function actionIndex() {
        return $this->inertia('dashboard/dashboard');
    }
}
