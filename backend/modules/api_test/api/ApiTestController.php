<?php

namespace backend\modules\api_test\api;

use Yii;
use backend\controllers\RestController;
use backend\modules\api_test\domain\service\ApiTestService;


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
}
