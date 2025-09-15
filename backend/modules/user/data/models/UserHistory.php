<?php

namespace backend\modules\user\data\models;

use Yii;

/**
 * This is the model class for table "user_history".
 *
 * @property string $historyUUID
 * @property string $UUID
 * @property string $username
 * @property string|null $fullName
 * @property string|null $profileImage
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
 * @property string|null $department
 */
class UserHistory extends \backend\components\db\AppModel
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
            [['fullName', 'profileImage', 'gender', 'title', 'phoneNo', 'description', 'address', 'accessToken', 'passwordResetToken', 'createdAt', 'updatedAt', 'createdBy', 'updatedBy', 'valid', '_actionUUID', '_version', 'action', 'date_created', 'department'], 'default', 'value' => null],
            [['historyUUID', 'UUID', 'username', 'authKey', 'passwordHash', 'email', 'user_id'], 'required'],
            [['valid', '_version'], 'integer'],
            [['historyUUID', 'UUID', 'gender', 'title', 'createdAt', 'updatedAt', 'createdBy', 'updatedBy', '_actionUUID', 'user_id', 'action', 'date_created', 'department'], 'string', 'max' => 50],
            [['username', 'phoneNo', 'email'], 'string', 'max' => 100],
            [['fullName', 'profileImage', 'passwordHash', 'passwordResetToken'], 'string', 'max' => 255],
            [['description', 'address', 'accessToken'], 'string', 'max' => 500],
            [['authKey'], 'string', 'max' => 32],
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
            'profileImage' => 'Profile Image',
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
            'department' => 'Department',
        ];
    }

    /**
     * {@inheritdoc}
     * @return \backend\modules\user\data\query\UserHistoryQuery the active query used by this AR class.
     */
    public static function find()
    {
        return new \backend\modules\user\data\query\UserHistoryQuery(get_called_class());
    }

}
