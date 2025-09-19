<?php

namespace backend\modules\client_database\data\dto;

use yii\base\Model;


class ClientDatabaseDTO extends Model {
    public ?string $UUID = null;
    public string $databaseName;
    public string $databaseSchema;
    public string $host;
    public string $port;
    public string $username;
    public string $password;


    public function rules()
    {
        return [[
            ['UUID', 'username', 'password', 'host', 'port', 
            'databaseName', 'databaseSchema'],
            'safe'
        ]];
    }
}
