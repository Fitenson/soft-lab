<?php

namespace backend\modules\client_database\api;

use Yii;
use backend\controllers\RestController;
use backend\modules\client_database\domain\entity\ClientDatabaseEntity;
use backend\modules\client_database\domain\service\ClientDatabaseService;
use backend\modules\client_database\form\ClientDatabaseForm;


class ClientDatabaseController extends RestController {
    private ClientDatabaseService $clientDatabaseService;

    public function init()
    {
        parent::init();
        $this->clientDatabaseService = Yii::$container->get(ClientDatabaseService::class);
    }


    public function actionIndex() {
        $params = Yii::$app->request->post()['param'];

        return $this->clientDatabaseService->index($params);
    }


    public function actionCreate() {
        $data = Yii::$app->request->post();

        $clientDatabaseForm = new ClientDatabaseForm();
        $clientDatabaseForm->load($data['clientDatabase'], '');

        if(!$clientDatabaseForm->validate()) {
            Yii::$app->exception->throw($clientDatabaseForm->getErrors(), 422);
        }

        $clientDatabaseData = $clientDatabaseForm->getAttributes();
        $clientDatabaseDTO = $this->clientDatabaseService->createClientDatabase(new ClientDatabaseEntity($clientDatabaseData));

        return [
            'clientDatabase' => $clientDatabaseDTO->asArray()
        ];
    }


    public function actionUpdate($id) {
        $data = Yii::$app->request->post();

        $clientDatabaseForm = new ClientDatabaseForm();
        $clientDatabaseForm->load($data['clientDatabase'], '');
        $clientDatabaseForm->UUID = $id;

        if(!$clientDatabaseForm->validate()) {
            Yii::$app->exception->throw($clientDatabaseForm->getErrors(), 422);
        }

        $clientDatabaseData = $clientDatabaseForm->getAttributes();
        $clientDatabaseDTO = $this->clientDatabaseService->updateClientDatabase(new ClientDatabaseEntity($clientDatabaseData));

        return [
            'clientDatabase' => $clientDatabaseDTO->asArray()
        ];
    }


    public function actionRemove() {
        return $this->clientDatabaseService->removeClientDatabase(Yii::$app->request->post());
    }
}
