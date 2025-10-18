<?php

namespace backend\modules\client_database\data\dto;

use JsonSerializable;
use yii\base\Model;


class ClientDatabaseTableDTO extends Model implements JsonSerializable {
    public string $tableName;
    public string $databaseName;
    public string $databaseSchema;


    public function rules()
    {
        return [[
            ['UUID', 'tableName', 'databaseName', 'databaseSchema'],
            'safe'
        ]];
    }


    public function jsonSerialize(): array
    {
        return parent::toArray();
    }

    public function asArray(): array
    {
        return $this->jsonSerialize();
    }
}