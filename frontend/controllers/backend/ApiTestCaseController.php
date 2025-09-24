<?php

namespace frontend\controllers\backend;

use common\components\inertia\InertiaController;


class ApiTestCaseController extends InertiaController {
    public function actionIndex() {
        return $this->inertia('api');
    }
}
