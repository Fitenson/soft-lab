<?php

namespace backend\modules\user\data\models;

use Yii;
use yii\base\UserException;
use yii\web\IdentityInterface;

use backend\modules\user\data\query\UserQuery;
use backend\modules\department\data\models\Department;

/**
 * This is the model class for table "user".
 *
 * @property string $UUID
 * @property string $username
 * @property string $email
 * @property string|null $fullName
 * @property string|null $role
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
 * @property string|null $createdAt
 * @property string|null $updatedAt
 * @property string|null $createdBy
 * @property string|null $updatedBy
 * @property int|null $valid
 * @property string|null $_actionUUID
 * @property int|null $_version
 * @property string|null $verification_token
 * @property string|null $department
 *
 * @property User $createdBy0
 * @property Department $department0
 * @property Department[] $departments
 * @property Department[] $departments0
 * @property Department[] $departments1
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
            [['fullName', 'role', 'profileImage', 'gender', 'title', 'phoneNo', 'description', 'address', 'accessToken', 'passwordResetToken', 'createdAt', 'updatedAt', 'createdBy', 'updatedBy', 'valid', '_actionUUID', '_version', 'verification_token', 'department'], 'default', 'value' => null],
            [['UUID', 'username', 'email', 'authKey', 'passwordHash'], 'required'],
            [['valid', '_version'], 'integer'],
            [['UUID', '_actionUUID', 'department'], 'string', 'max' => 40],
            [['username', 'email', 'phoneNo'], 'string', 'max' => 100],
            [['fullName', 'profileImage', 'passwordHash', 'passwordResetToken', 'verification_token'], 'string', 'max' => 255],
            [['role', 'gender', 'title'], 'string', 'max' => 50],
            [['description', 'address', 'accessToken'], 'string', 'max' => 500],
            [['authKey'], 'string', 'max' => 32],
            [['createdAt', 'updatedAt', 'createdBy', 'updatedBy'], 'string', 'max' => 30],
            [['username'], 'unique'],
            [['email'], 'unique'],
            [['passwordResetToken'], 'unique'],
            [['UUID'], 'unique'],
            [['createdBy'], 'exist', 'skipOnError' => true, 'targetClass' => User::class, 'targetAttribute' => ['createdBy' => 'UUID']],
            [['department'], 'exist', 'skipOnError' => true, 'targetClass' => Department::class, 'targetAttribute' => ['department' => 'UUID']],
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
            'email' => 'Email',
            'fullName' => 'Full Name',
            'role' => 'Role',
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
            'createdAt' => 'Created At',
            'updatedAt' => 'Updated At',
            'createdBy' => 'Created By',
            'updatedBy' => 'Updated By',
            'valid' => 'Valid',
            '_actionUUID' => 'Action Uuid',
            '_version' => 'Version',
            'verification_token' => 'Verification Token',
            'department' => 'Department',
        ];
    }

    /**
     * Gets query for [[CreatedBy0]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getCreatedBy0()
    {
        return $this->hasOne(User::class, ['UUID' => 'createdBy']);
    }

    /**
     * Gets query for [[Department0]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getDepartment0()
    {
        return $this->hasOne(Department::class, ['UUID' => 'department']);
    }

    /**
     * Gets query for [[Departments]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getDepartments()
    {
        return $this->hasMany(Department::class, ['createdBy' => 'UUID']);
    }

    /**
     * Gets query for [[Departments0]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getDepartments0()
    {
        return $this->hasMany(Department::class, ['head' => 'UUID']);
    }

    /**
     * Gets query for [[Departments1]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getDepartments1()
    {
        return $this->hasMany(Department::class, ['updatedBy' => 'UUID']);
    }

    /**
     * Gets query for [[UpdatedBy0]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getUpdatedBy0()
    {
        return $this->hasOne(User::class, ['UUID' => 'updatedBy']);
    }

    /**
     * Gets query for [[Users]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getUsers()
    {
        return $this->hasMany(User::class, ['createdBy' => 'UUID']);
    }

    /**
     * Gets query for [[Users0]].
     *
     * @return \yii\db\ActiveQuery
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
        $token = Yii::$app->security->generateRandomString();
        $this->accessToken = Yii::$app->security->generatePasswordHash($token);
        return $token;
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
