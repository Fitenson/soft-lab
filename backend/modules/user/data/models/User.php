<?php

namespace backend\modules\user\data\models;

use Yii;
use yii\base\UserException;
use yii\web\IdentityInterface;

use backend\modules\user\data\query\UserQuery;

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
 * @property string|null $verification_token
 *
 * @property User $createdBy0
 * @property User $updatedBy0
 * @property User[] $users
 * @property User[] $users0
 */
class User extends \backend\components\db\AppModel implements IdentityInterface
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
            [['fullName', 'gender', 'title', 'phoneNo', 'description', 'address', 'accessToken', 'passwordResetToken', 'valid', '_actionUUID', '_version', 'createdAt', 'updatedAt', 'createdBy', 'updatedBy', 'verification_token'], 'default', 'value' => null],
            [['UUID', 'username', 'authKey', 'passwordHash', 'email'], 'required'],
            [['valid', '_version'], 'integer'],
            [['UUID', 'gender', 'title', '_actionUUID', 'createdAt', 'updatedAt', 'createdBy', 'updatedBy'], 'string', 'max' => 50],
            [['username', 'phoneNo', 'email'], 'string', 'max' => 100],
            [['fullName', 'passwordHash', 'passwordResetToken', 'verification_token'], 'string', 'max' => 255],
            [['description', 'address', 'accessToken'], 'string', 'max' => 500],
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

    public static function findIdentity($id)
    {
        return static::findOne($id);
    }

    public static function findIdentityByAccessToken($token, $type = null)
    {
        return static::findOne(['accessToken' => $token]);
    }

    public function getId()
    {
        return $this->getPrimaryKey();
    }

    public function getAuthKey()
    {
        return $this->authKey;
    }

    public function validateAuthKey($authKey)
    {
        return $this->getAuthKey() === $authKey;
    }

    public function validateAccessToken($accessToken)
    {
        return Yii::$app->security->validatePassword($accessToken, $this->accessToken);
    }

    public function generateAuthKey()
    {
        $this->authKey = Yii::$app->security->generateRandomString();
    }

    public function generateAccessToken()
    {
        $this->accessToken = Yii::$app->security->generateRandomString();
    }

    /**
     * Validates password
     *
     * @param string $password password to validate
     * @return bool if password provided is valid for current user
     */
    public function validatePassword($password)
    {
        return Yii::$app->security->validatePassword($password, $this->passwordHash);
    }
}
