<?php

namespace backend\modules\project\data\models;

use Yii;

use backend\modules\user\data\models\User;

/**
 * This is the model class for table "project".
 *
 * @property string $UUID
 * @property string $projectCode
 * @property string|null $projectName
 * @property string|null $description
 * @property string|null $secondDescription
 * @property string|null $moreDescription
 * @property string|null $createdAt
 * @property string|null $updatedAt
 * @property string|null $createdBy
 * @property string|null $updatedBy
 * @property int|null $valid
 * @property string|null $_actionUUID
 * @property int|null $_version
 *
 * @property User $createdBy0
 * @property User $updatedBy0
 */
class Project extends \backend\components\db\AppModel
{


    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'project';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['projectName', 'description', 'secondDescription', 'moreDescription', 'createdAt', 'updatedAt', 'createdBy', 'updatedBy', 'valid', '_actionUUID', '_version'], 'default', 'value' => null],
            [['UUID', 'projectCode'], 'required'],
            [['valid', '_version'], 'integer'],
            [['UUID', 'createdAt', 'updatedAt', 'createdBy', 'updatedBy', '_actionUUID'], 'string', 'max' => 50],
            [['projectCode', 'projectName'], 'string', 'max' => 100],
            [['description'], 'string', 'max' => 500],
            [['secondDescription'], 'string', 'max' => 750],
            [['moreDescription'], 'string', 'max' => 1000],
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
            'projectCode' => 'Project Code',
            'projectName' => 'Project Name',
            'description' => 'Description',
            'secondDescription' => 'Second Description',
            'moreDescription' => 'More Description',
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
     * @return \yii\db\ActiveQuery|\backend\modules\project\data\query\UserQuery
     */
    public function getCreatedBy0()
    {
        return $this->hasOne(User::class, ['UUID' => 'createdBy']);
    }

    /**
     * Gets query for [[UpdatedBy0]].
     *
     * @return \yii\db\ActiveQuery|\backend\modules\project\data\query\UserQuery
     */
    public function getUpdatedBy0()
    {
        return $this->hasOne(User::class, ['UUID' => 'updatedBy']);
    }

    /**
     * {@inheritdoc}
     * @return \backend\modules\project\data\query\ProjectQuery the active query used by this AR class.
     */
    public static function find()
    {
        return new \backend\modules\project\data\query\ProjectQuery(get_called_class());
    }
}
