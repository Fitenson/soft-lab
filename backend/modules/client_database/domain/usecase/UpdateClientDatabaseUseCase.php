<?php

namespace backend\modules\client_database\domain\usecase;

use Yii;
use backend\modules\client_database\domain\entity\ClientDatabaseEntity;
use backend\modules\client_database\data\models\ClientDatabase;


class UpdateClientDatabaseUseCase {
    public string $actionUUID;


    public function execute(ClientDatabaseEntity $clientDatabaseEntity): ClientDatabaseEntity
    {
        $_actionUUID = $this->actionUUID;

        $clientDatabaseDTO = $clientDatabaseEntity->asDTO();
        $ClientDatabase = ClientDatabase::findOne($clientDatabaseDTO->UUID);
        $ClientDatabase->load($clientDatabaseDTO->getAttributes(), '');
        $ClientDatabase->_actionUUID = $_actionUUID;

        if(!$ClientDatabase->save(false)) {
            Yii::$app->exception->throw($ClientDatabase->getErrors(), 500);
        }

        return new ClientDatabaseEntity($ClientDatabase->getAttributes());
    }
}
