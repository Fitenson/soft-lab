<?php

namespace frontend\controllers\project_management;

use Yii;
use common\components\inertia\InertiaController;
use backend\modules\project\domain\service\ProjectService;


class ProjectController extends InertiaController {
    private ProjectService $projectService;

    public function init()
    {
        parent::init();
        $this->projectService = Yii::$container->get(ProjectService::class);
    }


    public function actionIndex()
    {
        return $this->inertia('project_management/project/index');
    }


    public function actionCreate()
    {
        return $this->inertia('project_management/project/form');
    }


    public  function actionView(string $id) 
    {
        $projectDTO = $this->projectService->viewProject($id);

        return $this->inertia('project_management/project/form', [
            'project' => $projectDTO->asArray()
        ]);
    }
}
