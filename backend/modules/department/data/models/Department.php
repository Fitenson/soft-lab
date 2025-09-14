<?php

namespace backend\modules\department\data\models;

use backend\modules\department\data\query\DepartmentQuery;
use Yii;
use backend\modules\user\data\models\User;

/**
 * This is the model class for table "department".
 *
 * @property string $UUID
 * @property string $departmentID
 * @property string $departmentName
 * @property string|null $head
 * @property string|null $description
 * @property string|null $createdAt
 * @property string|null $updatedAt
 * @property string|null $createdBy
 * @property string|null $updatedBy
 * @property int|null $valid
 * @property string|null $_actionUUID
 * @property int|null $_version
 *
 * @property User $createdBy0
 * @property User $head0
 * @property User $updatedBy0
 * @property User[] $users
 */
class Department extends \backend\components\db\AppModel
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'department';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['head', 'description', 'createdAt', 'updatedAt', 'createdBy', 'updatedBy', 'valid', '_actionUUID', '_version'], 'default', 'value' => null],
            [['UUID', 'departmentID', 'departmentName'], 'required'],
            [['valid', '_version'], 'integer'],
            [['UUID', 'head', 'createdAt', 'updatedAt', 'createdBy', 'updatedBy', '_actionUUID'], 'string', 'max' => 50],
            [['departmentID', 'departmentName'], 'string', 'max' => 100],
            [['description'], 'string', 'max' => 1000],
            [['UUID'], 'unique'],
            [['createdBy'], 'exist', 'skipOnError' => true, 'targetClass' => User::class, 'targetAttribute' => ['createdBy' => 'UUID']],
            [['head'], 'exist', 'skipOnError' => true, 'targetClass' => User::class, 'targetAttribute' => ['head' => 'UUID']],
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
            'departmentID' => 'Department ID',
            'departmentName' => 'Department Name',
            'head' => 'Head',
            'description' => 'Description',
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
     * Gets query for [[CreatedBy0]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getCreatedBy0()
    {
        return $this->hasOne(User::class, ['UUID' => 'createdBy']);
    }

    /**
     * Gets query for [[Head0]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getHead0()
    {
        return $this->hasOne(User::class, ['UUID' => 'head']);
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
        return $this->hasMany(User::class, ['department' => 'UUID']);
    }

    public static function find()
    {
        return new DepartmentQuery(get_called_class());
    }
}
