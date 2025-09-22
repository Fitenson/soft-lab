<?php

namespace backend\modules\client_database\data\models;

use Yii;

/**
 * This is the model class for table "client_database".
 *
 * @property string $UUID
 * @property string $databaseName
 * @property string $databaseSchema
 * @property string $host
 * @property string $port
 * @property string $username
 * @property string $passwordHash
 * @property string|null $createdAt
 * @property string|null $updatedAt
 * @property string|null $createdBy
 * @property string|null $updatedBy
 * @property int|null $valid
 * @property string|null $_actionUUID
 * @property int|null $_version
 */
class ClientDatabase extends \backend\components\db\AppModel
{


    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'client_database';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['createdAt', 'updatedAt', 'createdBy', 'updatedBy', 'valid', '_actionUUID', '_version'], 'default', 'value' => null],
            [['UUID', 'databaseName', 'databaseSchema', 'host', 'port', 'username', 'passwordHash'], 'required'],
            [['valid', '_version'], 'integer'],
            [['UUID', '_actionUUID'], 'string', 'max' => 40],
            [['databaseName', 'databaseSchema', 'host', 'port', 'username', 'passwordHash'], 'string', 'max' => 50],
            [['createdAt', 'updatedAt', 'createdBy', 'updatedBy'], 'string', 'max' => 30],
            [['databaseName'], 'unique'],
            [['databaseSchema'], 'unique'],
            [['UUID'], 'unique'],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'UUID' => 'Uuid',
            'databaseName' => 'Database Name',
            'databaseSchema' => 'Database Schema',
            'host' => 'Host',
            'port' => 'Port',
            'username' => 'Username',
            'passwordHash' => 'Password Hash',
            'createdAt' => 'Created At',
            'updatedAt' => 'Updated At',
            'createdBy' => 'Created By',
            'updatedBy' => 'Updated By',
            'valid' => 'Valid',
            '_actionUUID' => 'Action Uuid',
            '_version' => 'Version',
        ];
    }

    /**
     * {@inheritdoc}
     * @return \backend\modules\client_database\data\query\ClientDatabaseQuery the active query used by this AR class.
     */
    public static function find()
    {
        return new \backend\modules\client_database\data\query\ClientDatabaseQuery(get_called_class());
    }

}
