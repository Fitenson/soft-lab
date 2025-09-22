<?php

namespace backend\modules\client_database\data\models;

use Yii;

/**
 * This is the model class for table "client_database_history".
 *
 * @property string $historyUUID
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
 * @property string $user_id
 * @property string|null $action
 * @property string|null $date_created
 */
class ClientDatabaseHistory extends \backend\components\db\AppModel
{


    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'client_database_history';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['createdAt', 'updatedAt', 'createdBy', 'updatedBy', 'valid', '_actionUUID', '_version', 'action', 'date_created'], 'default', 'value' => null],
            [['historyUUID', 'UUID', 'databaseName', 'databaseSchema', 'host', 'port', 'username', 'passwordHash', 'user_id'], 'required'],
            [['valid', '_version'], 'integer'],
            [['historyUUID', 'databaseName', 'databaseSchema', 'host', 'port', 'username', 'passwordHash', 'user_id', 'action'], 'string', 'max' => 50],
            [['UUID', '_actionUUID'], 'string', 'max' => 40],
            [['createdAt', 'updatedAt', 'createdBy', 'updatedBy'], 'string', 'max' => 30],
            [['date_created'], 'string', 'max' => 100],
            [['historyUUID'], 'unique'],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'historyUUID' => 'History Uuid',
            'UUID' => 'Uuid',
            'databaseName' => 'Database Name',
            'databaseSchema' => 'Database Schema',
            'host' => 'Host',
            'port' => 'Port',
            'username' => 'Username',
            'passwordHash' => 'PasswordHash',
            'createdAt' => 'Created At',
            'updatedAt' => 'Updated At',
            'createdBy' => 'Created By',
            'updatedBy' => 'Updated By',
            'valid' => 'Valid',
            '_actionUUID' => 'Action Uuid',
            '_version' => 'Version',
            'user_id' => 'User ID',
            'action' => 'Action',
            'date_created' => 'Date Created',
        ];
    }

    /**
     * {@inheritdoc}
     * @return \backend\modules\client_database\data\query\ClientDatabaseHistoryQuery the active query used by this AR class.
     */
    public static function find()
    {
        return new \backend\modules\client_database\data\query\ClientDatabaseHistoryQuery(get_called_class());
    }

}
