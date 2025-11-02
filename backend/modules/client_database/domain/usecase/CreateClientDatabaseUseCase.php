<?php

namespace backend\modules\client_database\domain\usecase;

use Yii;
use backend\modules\client_database\data\models\ClientDatabase;
use backend\modules\client_database\data\models\ClientDatabaseHasRefreshToken;
use backend\modules\client_database\domain\entity\ClientDatabaseEntity;


class CreateClientDatabaseUseCase {
    public string $actionUUID;


    public function execute(ClientDatabaseEntity $clientDatabaseEntity): ClientDatabaseEntity
    {
        $_actionUUID = $this->actionUUID;

        $clientDatabaseDTO = $clientDatabaseEntity->asDTO();
        $ClientDatabase = new ClientDatabase();
        $ClientDatabase->load($clientDatabaseDTO->getAttributes(), '');
        $ClientDatabase->_actionUUID = $_actionUUID;

        if(!$ClientDatabase->save(false)) {
            Yii::$app->exception->throw($ClientDatabase->getErrors(), 500);
        }

        $ClientDatabaseHasRefreshToken = new ClientDatabaseHasRefreshToken();
        $ClientDatabaseHasRefreshToken->clientDatabase = $ClientDatabase->UUID;
        $ClientDatabaseHasRefreshToken->user = Yii::$app->user->id;
        $ClientDatabaseHasRefreshToken->expiresAt = strtotime("+1 week");
        $ClientDatabaseHasRefreshToken->_actionUUID = $_actionUUID;
        $ClientDatabaseHasRefreshToken->generateRefreshToken();
        $ClientDatabaseHasRefreshToken->save(false);

        return new ClientDatabaseEntity($ClientDatabase->getAttributes());
    }
}
