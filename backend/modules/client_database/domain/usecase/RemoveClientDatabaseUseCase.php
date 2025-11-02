<?php

namespace backend\modules\client_database\domain\usecase;

use Yii;
use Throwable;
use backend\modules\client_database\data\models\ClientDatabase;
use backend\modules\client_database\data\dto\ClientDatabaseDTO;


class RemoveClientDatabaseUseCase {
    public string $actionUUID;


    public function execute(array $data): array
    {
        $_actionUUID = $this->actionUUID;

        $status = [
            'success' => [],
            'failed' => []
        ];

        $UUIDs = $data['UUIDs'];
        $ClientDatabases = ClientDatabase::find()->where(['UUID' => $UUIDs])->all();

        foreach($ClientDatabases as $ClientDatabase) {
            try {
                $transaction = Yii::$app->db->beginTransaction();
                $ClientDatabase->_actionUUID = $_actionUUID;
                $ClientDatabase->delete();
                $transaction->commit();

                $clientDatabaseDTO = new ClientDatabaseDTO();
                $clientDatabaseDTO->load($ClientDatabase->getAttributes(), '');
                $status['success'][] = $clientDatabaseDTO;
            } catch(Throwable $error) {
                $transaction->rollBack();

                $clientDatabaseDTO = new ClientDatabaseDTO();
                $clientDatabaseDTO->load($ClientDatabase->getAttributes(), '');
                $status['failed'][] = $clientDatabaseDTO;
                $status['failed']['message'] = $error->getMessage();
            }
        }

        return $status;
    }
}
