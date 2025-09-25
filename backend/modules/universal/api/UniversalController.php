<?php

namespace backend\modules\universal\api;

use Yii;
use backend\controllers\RestController;
use backend\modules\universal\domain\service\UniversalService;


class UniversalController extends RestController {
    private UniversalService $universalService;


    public function init()
    {
        $this->universalService = Yii::$container->get(UniversalService::class);
    }


    public function actionDropdownTable()
    {
        $post = Yii::$app->request->post();
        return $this->universalService->dropdownTable($post['param'], $post['table']);
    }
}
