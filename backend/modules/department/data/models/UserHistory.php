<?php

namespace backend\modules\user\data\models;

use Yii;

/**
 * This is the model class for table "user_history".
 *
 * @property string $historyUUID
 * @property string|null $UUID
 * @property string $username
 * @property string|null $fullName
 * @property string|null $gender
 * @property string|null $title
 * @property string|null $phoneNo
 * @property string|null $description
 * @property string|null $address
 * @property string|null $accessToken
 * @property string $authKey
 * @property string $passwordHash
 * @property string|null $passwordResetToken
 * @property string $email
 * @property int|null $valid
 * @property string|null $_actionUUID
 * @property int|null $_version
 * @property string|null $createdAt
 * @property string|null $updatedAt
 * @property string|null $createdBy
 * @property string|null $updatedBy
 * @property string|null $user_id
 * @property string|null $action
 * @property string|null $date_created
 */
class UserHistory extends \yii\db\ActiveRecord
{


    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'user_history';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['UUID', 'fullName', 'gender', 'title', 'phoneNo', 'description', 'address', 'accessToken', 'passwordResetToken', 'valid', '_actionUUID', '_version', 'createdAt', 'updatedAt', 'createdBy', 'updatedBy', 'user_id', 'action', 'date_created'], 'default', 'value' => null],
            [['historyUUID', 'username', 'authKey', 'passwordHash', 'email'], 'required'],
            [['valid', '_version'], 'integer'],
            [['historyUUID', 'UUID', 'gender', 'title', '_actionUUID', 'createdAt', 'updatedAt', 'createdBy', 'updatedBy', 'user_id', 'action', 'date_created'], 'string', 'max' => 50],
            [['username', 'phoneNo', 'email'], 'string', 'max' => 100],
            [['fullName', 'passwordHash', 'passwordResetToken'], 'string', 'max' => 255],
            [['description', 'address', 'accessToken'], 'string', 'max' => 500],
            [['authKey'], 'string', 'max' => 32],
            [['username'], 'unique'],
            [['email'], 'unique'],
            [['passwordResetToken'], 'unique'],
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
            'username' => 'Username',
            'fullName' => 'Full Name',
            'gender' => 'Gender',
            'title' => 'Title',
            'phoneNo' => 'Phone No',
            'description' => 'Description',
            'address' => 'Address',
            'accessToken' => 'Access Token',
            'authKey' => 'Auth Key',
            'passwordHash' => 'Password Hash',
            'passwordResetToken' => 'Password Reset Token',
            'email' => 'Email',
            'valid' => 'Valid',
            '_actionUUID' => 'Action Uuid',
            '_version' => 'Version',
            'createdAt' => 'Created At',
            'updatedAt' => 'Updated At',
            'createdBy' => 'Created By',
            'updatedBy' => 'Updated By',
            'user_id' => 'User ID',
            'action' => 'Action',
            'date_created' => 'Date Created',
        ];
    }

}
