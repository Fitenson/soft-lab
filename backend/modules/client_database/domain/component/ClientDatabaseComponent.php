<?php

namespace backend\modules\client_database\domain\component;

use yii\base\Component;
use yii\db\Connection;
use backend\modules\client_database\domain\entity\ClientDatabaseEntity;


class ClientDatabaseComponent extends Component {
    public function connect(ClientDatabaseEntity $clientDatabaseEntity, ?callable $callback)
    {
        $dsn = $clientDatabaseEntity->getDsn();

        // echo '<pre>';
        // print_r($clientDatabaseEntity);
        // die;

        // Create a temporary DB connection
        $tempDb = new Connection([
            'dsn' => $dsn,
            'username' => $clientDatabaseEntity->getUsername(),
            'password' => $clientDatabaseEntity->getPassword(),
            'charset' => 'utf8',
        ]);

        try {
            $tempDb->open();
            
            if ($callback) {
                $result = call_user_func($callback, $tempDb);
                return $result;
            }

            return $tempDb;
        } catch (\Throwable $error) {
            throw $error;
        } finally {
            if ($tempDb->isActive) {
                $tempDb->close();
            }
        }
    }
}
