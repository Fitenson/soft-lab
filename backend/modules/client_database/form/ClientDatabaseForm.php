<?php

namespace backend\modules\client_database\form;

use backend\components\form\Form;
use backend\modules\user\data\models\User;


class ClientDatabaseForm extends Form {
    public ?string $UUID = null;
    public ?string $databaseName;
    public ?string $databaseSchema;
    public ?string $host;
    public ?string $port;
    public ?string $username;
    public ?string $password;


    public function rules()
    {
        return [
            [['databaseName', 'databaseSchema', 'host', 'port', 'username', 'password'], 'required'],
            [['UUID'], 'string', 'max' => 40],
            [['databaseName', 'databaseSchema', 'host', 'port', 'username', 'password'], 'string', 'max' => 50],
            [['createdAt', 'updatedAt', 'createdBy', 'updatedBy'], 'string', 'max' => 30],
            [['databaseName'], 'unique', 
                'targetClass' => User::class,
                'targetAttribute' => 'databaseName',
                'filter' => function($query) {
                    if(!empty($this->UUID)) {
                        $query->andWhere(['<>', 'UUID', $this->UUID]);
                    }
                }
            ],
            [['databaseSchema'], 'unique',
                'targetClass' => User::class,
                'targetAttribute' => 'databaseSchema',
                'filter' => function($query) {
                    if(!empty($this->UUID)) {
                        $query->andWhere(['<>', 'UUID', $this->UUID]);
                    }
                }
            ],
        ];
    }
}
