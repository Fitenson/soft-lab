<?php

namespace backend\modules\user;

use Yii;

/**
 * This is the model class for table "user".
 *
 * @property string $UUID
 * @property string $username
 * @property string|null $fullName
 * @property string|null $gender
 * @property string|null $title
 * @property string|null $phoneNo
 * @property string|null $description
 * @property string|null $address
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
 * @property string|null $verification_token
 *
 * @property User $createdBy0
 * @property User $updatedBy0
 * @property User[] $users
 * @property User[] $users0
 */
class User extends \backend\components\db\AppModel
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'user';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['fullName', 'gender', 'title', 'phoneNo', 'description', 'address', 'passwordResetToken', 'valid', '_actionUUID', '_version', 'createdAt', 'updatedAt', 'createdBy', 'updatedBy', 'verification_token'], 'default', 'value' => null],
            [['UUID', 'username', 'authKey', 'passwordHash', 'email'], 'required'],
            [['valid', '_version'], 'integer'],
            [['UUID', 'gender', 'title', '_actionUUID', 'createdAt', 'updatedAt', 'createdBy', 'updatedBy'], 'string', 'max' => 50],
            [['username', 'phoneNo', 'email'], 'string', 'max' => 100],
            [['fullName', 'passwordHash', 'passwordResetToken', 'verification_token'], 'string', 'max' => 255],
            [['description', 'address'], 'string', 'max' => 500],
            [['authKey'], 'string', 'max' => 32],
            [['username'], 'unique'],
            [['email'], 'unique'],
            [['passwordResetToken'], 'unique'],
            [['UUID'], 'unique'],
            [['createdBy'], 'exist', 'skipOnError' => true, 'targetClass' => User::class, 'targetAttribute' => ['createdBy' => 'UUID']],
            [['updatedBy'], 'exist', 'skipOnError' => true, 'targetClass' => User::class, 'targetAttribute' => ['updatedBy' => 'UUID']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'UUID' => 'Uuid',
            'username' => 'Username',
            'fullName' => 'Full Name',
            'gender' => 'Gender',
            'title' => 'Title',
            'phoneNo' => 'Phone No',
            'description' => 'Description',
            'address' => 'Address',
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
            'verification_token' => 'Verification Token',
        ];
    }

    /**
     * Gets query for [[CreatedBy0]].
     *
     * @return \yii\db\ActiveQuery|UserQuery
     */
    public function getCreatedBy0()
    {
        return $this->hasOne(User::class, ['UUID' => 'createdBy']);
    }

    /**
     * Gets query for [[UpdatedBy0]].
     *
     * @return \yii\db\ActiveQuery|UserQuery
     */
    public function getUpdatedBy0()
    {
        return $this->hasOne(User::class, ['UUID' => 'updatedBy']);
    }

    /**
     * Gets query for [[Users]].
     *
     * @return \yii\db\ActiveQuery|UserQuery
     */
    public function getUsers()
    {
        return $this->hasMany(User::class, ['createdBy' => 'UUID']);
    }

    /**
     * Gets query for [[Users0]].
     *
     * @return \yii\db\ActiveQuery|UserQuery
     */
    public function getUsers0()
    {
        return $this->hasMany(User::class, ['updatedBy' => 'UUID']);
    }

    /**
     * {@inheritdoc}
     * @return UserQuery the active query used by this AR class.
     */
    public static function find()
    {
        return new UserQuery(get_called_class());
    }
}
