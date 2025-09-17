<?php

namespace frontend\controllers\project_management;

use Yii;
use common\components\inertia\InertiaController;


class ProjectController extends InertiaController {
    public function actionIndex()
    {
        return $this->inertia('project_management/project/index');
    }


    public function actionCreate()
    {
        return $this->inertia('project_management/project/form');
    }
}
