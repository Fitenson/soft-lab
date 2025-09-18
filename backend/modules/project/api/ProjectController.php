<?php

namespace backend\modules\project\api;

use Yii;
use backend\controllers\RestController;
use backend\modules\project\domain\entity\ProjectEntity;
use backend\modules\project\domain\service\ProjectService;
use backend\modules\project\form\ProjectForm;


class ProjectController extends RestController {
    private ProjectService $projectService;

    public function init()
    {
        parent::init();
        $this->projectService = Yii::$container->get(ProjectService::class);
    }


    public function actionIndex() {
        $params = Yii::$app->request->post()['param'];

        return $this->projectService->index($params);
    }


    public function actionCreate() {
        $data = Yii::$app->request->post();

        $ProjectForm = new ProjectForm();
        $ProjectForm->load($data['project'], '');

        if(!$ProjectForm->validate()) {
            Yii::$app->exception->throw($ProjectForm->getErrors(), 422);
        }

        $projectData = $ProjectForm->getAttributes();
        $projectDTO = $this->projectService->createProject(new ProjectEntity($projectData));

        return [
            'project' => $projectDTO->asArray()
        ];
    }


    public function actionUpdate($id) {
        $data = Yii::$app->request->post();

        $ProjectForm = new ProjectForm();
        $ProjectForm->load($data['project'], '');
        $ProjectForm->UUID = $id;

        if(!$ProjectForm->validate()) {
            Yii::$app->exception->throw($ProjectForm->getErrors(), 422);
        }

        $projectData = $ProjectForm->getAttributes();
        $projectDTO = $this->projectService->updateProject(new ProjectEntity($projectData));

        return [
            'project' => $projectDTO->asArray()
        ];
    }


    public function actionRemove() {
        return $this->projectService->removeProject(Yii::$app->request->post());
    }
}
