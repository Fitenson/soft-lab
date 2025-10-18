<?php

namespace backend\modules\client_database\data\models;

use yii\db\Connection;
use backend\components\db\AppModel;


class ClientDatabaseTable extends AppModel {
    private string $tableName;
    private ?Connection $connection;

    public function setTableName(string $tableName) {
        $this->tableName = $tableName;
    }

    public function setDb(Connection $connection): void
    {
        $this->connection = $connection;
    }

    public static function getDb()
    {
        $instance = new static();

        return $instance->connection;
    }

    public static function tableName()
    {
        $instance = new static();

        return $instance->tableName;
    }
}
