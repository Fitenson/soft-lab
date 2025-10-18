<?php

namespace backend\modules\client_database\data\models;

use Yii;

/**
 * This is the model class for table "client_database_has_refresh_token".
 *
 * @property string $UUID
 * @property string $clientDatabase
 * @property string $user
 * @property string|null $refreshToken
 * @property string $expiresAt
 * @property string|null $createdAt
 * @property string|null $updatedAt
 * @property string|null $createdBy
 * @property string|null $updatedBy
 * @property int|null $valid
 * @property string|null $_actionUUID
 * @property int|null $_version
 */
class ClientDatabaseHasRefreshToken extends \backend\components\db\AppModel
{


    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'clientDatabaseHasRefreshToken';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['refreshToken', 'createdAt', 'updatedAt', 'createdBy', 'updatedBy', 'valid', '_actionUUID', '_version'], 'default', 'value' => null],
            [['UUID', 'clientDatabase', 'user', 'expiresAt'], 'required'],
            [['valid', '_version'], 'integer'],
            [['UUID', 'clientDatabase', 'user', '_actionUUID'], 'string', 'max' => 40],
            [['refreshToken'], 'string', 'max' => 32],
            [['expiresAt', 'createdAt', 'updatedAt', 'createdBy', 'updatedBy'], 'string', 'max' => 30],
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
            'clientDatabase' => 'Client Database',
            'user' => 'User',
            'refreshToken' => 'Refresh Token',
            'expiresAt' => 'Expires At',
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
     * @return \backend\modules\client_database\data\query\ClientDatabaseHasRefreshTokenQuery the active query used by this AR class.
     */
    public static function find()
    {
        return new \backend\modules\client_database\data\query\ClientDatabaseHasRefreshTokenQuery(get_called_class());
    }

    public function generateRefreshToken()
    {
        $token = Yii::$app->security->generateRandomString(32);
        $this->refreshToken = $token;
        return $token;
    }
}
