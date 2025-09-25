<?php

namespace backend\modules\client_database\data\dto;

use JsonSerializable;
use yii\base\Model;


class ClientDatabaseDTO extends Model implements JsonSerializable {
    public ?string $UUID = null;
    public string $databaseName;
    public string $databaseSchema;
    public string $host;
    public string $port;
    public string $username;
    public string $password;
    public string $project;


    public function rules()
    {
        return [[
            ['UUID', 'username', 'password', 'host', 'port', 
            'databaseName', 'databaseSchema', 'project'],
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
