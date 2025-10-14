<?php

namespace backend\modules\api_test\api;

use Yii;
use backend\controllers\RestController;
use backend\modules\api_test\domain\entity\ApiTestEntity;
use backend\modules\api_test\domain\entity\ApiTestHasDataEntity;
use backend\modules\api_test\domain\service\ApiTestService;
use backend\modules\api_test\form\ApiTestForm;
use backend\modules\api_test\form\ApiTestHasDataForm;

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
        $post = Yii::$app->request->post();

        $apiTestForm = new ApiTestForm();
        $apiTestForm->load($post['apiTest'], '');

        if(!$apiTestForm->validate()) {
            Yii::$app->exception->throw($apiTestForm->getErrors(), 422);
        }

        $apiTestHasDataEntities = [];

        if(!empty($post['apiTestHasData'])) {
            $apiTestHasDataForm = new ApiTestHasDataForm();
            $apiTestHasDataForm->load($post['apiTestHasData'], '');

            if(!$apiTestHasDataForm->validate()) {
                Yii::$app->exception->throw($apiTestHasDataForm->getErrors(), 422);
            }

            $apiTestHasDataEntities[] = new ApiTestHasDataEntity($apiTestHasDataForm->getAttributes());
        }
        

        $apiTestData = $apiTestForm->getAttributes();

        $clientDatabaseToken = Yii::$app->request->headers->get('X-Client-Database-Token');
        $data = $this->apiTestService->createApiTest([
            'apiTestEntity' => new ApiTestEntity($apiTestData),
            'apiTestHasDataEntities' => $apiTestHasDataEntities, 
            'clientDatabaseToken' => $clientDatabaseToken
        ]);

        $apiTestDTO = $data['apiTestDTO'];
        $apiTestHasDataDTO = $data['apiTestHasDataDTO'];


        return [
            'apiTest' => $apiTestDTO,
            'apiTestHasData' => $apiTestHasDataDTO,
        ];
    }


    public function actionUpdate(string $id)
    {
        $post = Yii::$app->request->post();

        $apiTestForm = new ApiTestForm();
        $apiTestForm->load($post['apiTest'], '');
        $apiTestForm->UUID = $id;

        if(!$apiTestForm->validate()) {
            Yii::$app->exception->throw($apiTestForm->getErrors(), 422);
        }

        $apiTestHasDataEntities = [];

        if(!empty($post['apiTestHasData'])) {
            foreach($post['apiTestHasData'] as $apiTestHasDataPost) {
                $apiTestHasDataForm = new ApiTestHasDataForm();
                $apiTestHasDataForm->load($apiTestHasDataPost, '');
                
                if(!$apiTestHasDataForm->validate()) {
                    Yii::$app->exception->throw($apiTestHasDataForm->getErrors(), 422);
                }
            
                $apiTestHasDataEntities[] = new ApiTestHasDataEntity($apiTestHasDataForm->getAttributes());
            }
        }        

        $apiTestData = $apiTestForm->getAttributes();

        $clientDatabaseToken = Yii::$app->request->headers->get('X-Client-Database-Token');
        $data = $this->apiTestService->updateApiTest([
            'apiTestEntity' => new ApiTestEntity($apiTestData),
            'apiTestHasDataEntities' => $apiTestHasDataEntities,
            'clientDatabaseToken' => $clientDatabaseToken
        ]);

        $apiTestDTO = $data['apiTestDTO'];
        $apiTestHasDataDTO = $data['apiTestHasDataDTO'];


        return [
            'apiTest' => $apiTestDTO,
            'apiTestHasData' => $apiTestHasDataDTO,
        ];
    }


    public function actionRemove() {
        return $this->apiTestService->removeApiTest(Yii::$app->request->post());
    }
}
