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
 * @property string $password
 * @property string $refreshToken
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
            [['UUID', 'databaseName', 'databaseSchema', 'host', 'port', 'username', 'password', 'refreshToken'], 'required'],
            [['valid', '_version'], 'integer'],
            [['UUID', 'databaseName', 'databaseSchema', 'host', 'port', 'username', 'password', '_actionUUID'], 'string', 'max' => 50],
            [['refreshToken', 'createdAt', 'updatedAt', 'createdBy', 'updatedBy'], 'string', 'max' => 100],
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
            'password' => 'Password',
            'refreshToken' => 'Refresh Token',
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
     * @return ClientDatabaseQuery the active query used by this AR class.
     */
    public static function find()
    {
        return new ClientDatabaseQuery(get_called_class());
    }

}
