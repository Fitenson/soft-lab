<?php

namespace frontend\controllers\backend;

use common\components\inertia\InertiaController;


class ApiTestController extends InertiaController {
    public function actionIndex() {
        return $this->inertia('backend/api_test/index');
    }
}
