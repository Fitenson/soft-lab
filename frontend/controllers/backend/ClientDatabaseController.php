<?php

namespace frontend\controllers\backend;

use Yii;
use common\components\inertia\InertiaController;
use backend\modules\client_database\domain\service\ClientDatabaseService;


class ClientDatabaseController extends InertiaController {
    private ClientDatabaseService $clientDatabaseService;

    public function init()
    {
        parent::init();
        $this->clientDatabaseService = Yii::$container->get(ClientDatabaseService::class);
    }


    public function actionIndex()
    {
        $data = $this->clientDatabaseService->index();
        return $this->inertia('backend/client_database/index', $data);
    }


    public function actionCreate()
    {
        return $this->inertia('backend/client_database/form');
    }


    public  function actionView(string $id)
    {
        $clientDatabaseDTO = $this->clientDatabaseService->viewClientDatabase($id);

        return $this->inertia('backend/client_database/form', [
            'clientDatabase' => $clientDatabaseDTO->asArray()
        ]);
    }
}
