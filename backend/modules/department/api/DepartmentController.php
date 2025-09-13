<?php

namespace backend\modules\department\api;

use Yii;
use backend\controllers\RestController;
use backend\modules\department\domain\entity\DepartmentEntity;
use backend\modules\department\domain\service\DepartmentService;
use backend\modules\department\form\DepartmentForm;


class DepartmentController extends RestController {
    private DepartmentService $departmentService;

    public function init()
    {
        parent::init();
        $this->departmentService = Yii::$container->get(DepartmentService::class);
    }


    public function actionIndex() {
        $params = Yii::$app->request->post()['param'];

        return $this->departmentService->index($params);
    }


    public function actionCreate() {
        $data = Yii::$app->request->post();

        $departmentForm = new DepartmentForm();
        $departmentForm->load($data['department'], '');

        if(!$departmentForm->validate()) {
            Yii::$app->exception->throw($departmentForm->getErrors(), 422);
        }

        $departmentData = $departmentForm->asArray();
        $departmentDTO = $this->departmentService->createDepartment(new DepartmentEntity($departmentData));

        return [
            'department' => $departmentDTO->asArray()
        ];
    }


    public function actionUpdate() {
        $data = Yii::$app->request->post();

        $departmentForm = new DepartmentForm();
        $departmentForm->load($data['department'], '');

        if(!$departmentForm->validate()) {
            Yii::$app->exception->throw($departmentForm->getErrors(), 422);
        }

        $departmentData = $departmentForm->attributes();
        $departmentDTO = $this->departmentService->updateDepartment(new DepartmentEntity($departmentData));

        return [
            'department' => $departmentDTO->asArray()
        ];
    }
}
