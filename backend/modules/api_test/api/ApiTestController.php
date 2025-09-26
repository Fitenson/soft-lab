<?php

namespace backend\modules\api_test\api;

use Yii;
use backend\controllers\RestController;
use backend\modules\api_test\domain\entity\ApiTestEntity;
use backend\modules\api_test\domain\service\ApiTestService;
use backend\modules\api_test\form\ApiTestForm;


class ApiTestController extends RestController {
    private ApiTestService $apiTestService;

    public function init()
    {
        $this->apiTestService = Yii::$container->get(ApiTestService::class);
    }


    public function actionListProjects()
    {
        return $this->apiTestService->listProjects();
    }

    
    public function actionIndex()
    {
        return $this->apiTestService->index();
    }


    public function actionCreate()
    {
        $data = Yii::$app->request->post();

        $apiTestForm = new ApiTestForm();
        $apiTestForm->load($data['apiTest'], '');

        if(!$apiTestForm->validate()) {
            Yii::$app->exception->throw($apiTestForm->getErrors(), 422);
        }

        $apiTestData = $apiTestForm->getAttributes();

        $apiTestDTO = $this->apiTestService->createApiTest(new ApiTestEntity($apiTestData));

        return [
            'apiTest' => $apiTestDTO
        ];
    }


    public function actionUpdate(string $id)
    {
        $data = Yii::$app->request->post();

        $apiTestForm = new ApiTestForm();
        $apiTestForm->load($data['apiTest'], '');
        $apiTestForm->UUID = $id;

        if(!$apiTestForm->validate()) {
            Yii::$app->exception->throw($apiTestForm->getErrors(), 422);
        }

        $apiTestData = $apiTestForm->getAttributes();
        $apiTestDTO = $this->apiTestService->updateApiTest(new ApiTestEntity($apiTestData));

        return [
            'apiTest' => $apiTestDTO
        ];
    }


    public function actionRemove() {
        return $this->apiTestService->removeApiTest(Yii::$app->request->post());
    }
}
