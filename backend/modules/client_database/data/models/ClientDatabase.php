<?php

namespace backend\modules\client_database\data\models;

use Yii;
use backend\modules\project\data\models\Project;

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
 * @property string $project
 * @property string|null $createdAt
 * @property string|null $updatedAt
 * @property string|null $createdBy
 * @property string|null $updatedBy
 * @property int|null $valid
 * @property string|null $_actionUUID
 * @property int|null $_version
 *
 * @property Project $project0
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
            [['UUID', 'databaseName', 'databaseSchema', 'host', 'port', 'username', 'passwordHash', 'project'], 'required'],
            [['valid', '_version'], 'integer'],
            [['UUID', 'project', '_actionUUID'], 'string', 'max' => 40],
            [['databaseName', 'databaseSchema', 'host', 'port', 'username'], 'string', 'max' => 50],
            [['passwordHash'], 'string', 'max' => 500],
            [['createdAt', 'updatedAt', 'createdBy', 'updatedBy'], 'string', 'max' => 30],
            [['databaseName'], 'unique'],
            [['databaseSchema'], 'unique'],
            [['UUID'], 'unique'],
            [['project'], 'exist', 'skipOnError' => true, 'targetClass' => Project::class, 'targetAttribute' => ['project' => 'UUID']],
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
            'project' => 'Project',
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
     * Gets query for [[Project0]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getProject0()
    {
        return $this->hasOne(Project::class, ['UUID' => 'project']);
    }

    public static function find()
    {
        return new \backend\modules\client_database\data\query\ClientDatabaseQuery(get_called_class());
    }
}
