<?php

namespace backend\modules\client_database\data\models;

use Yii;

/**
 * This is the model class for table "client_database_has_refresh_token_history".
 *
 * @property string $historyUUID
 * @property string $UUID
 * @property string $clientDatabase
 * @property string $user
 * @property string|null $refreshTokenHash
 * @property string $expiresAt
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
class ClientDatabaseHasRefreshTokenHistory extends \backend\components\db\AppModel
{


    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'clientDatabaseHasRefreshToken_history';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['refreshTokenHash', 'createdAt', 'updatedAt', 'createdBy', 'updatedBy', 'valid', '_actionUUID', '_version', 'action', 'date_created'], 'default', 'value' => null],
            [['historyUUID', 'UUID', 'clientDatabase', 'user', 'expiresAt', 'user_id'], 'required'],
            [['valid', '_version'], 'integer'],
            [['historyUUID', 'user_id', 'action'], 'string', 'max' => 50],
            [['UUID', 'clientDatabase', 'user', '_actionUUID'], 'string', 'max' => 40],
            [['refreshTokenHash'], 'string', 'max' => 255],
            [['expiresAt', 'createdAt', 'updatedAt', 'createdBy', 'updatedBy'], 'string', 'max' => 30],
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
            'clientDatabase' => 'Client Database',
            'user' => 'User',
            'refreshTokenHash' => 'Refresh Token Hash',
            'expiresAt' => 'Expires At',
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
     * @return \backend\modules\client_database\data\query\ClientDatabaseHasRefreshTokenHistoryQuery the active query used by this AR class.
     */
    public static function find()
    {
        return new \backend\modules\client_database\data\query\ClientDatabaseHasRefreshTokenHistoryQuery(get_called_class());
    }

}
