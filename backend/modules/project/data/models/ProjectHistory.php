<?php

namespace backend\modules\project\data\models;

use Yii;

/**
 * This is the model class for table "project_history".
 *
 * @property string $historyUUID
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
 * @property string $user_id
 * @property string|null $action
 * @property string|null $date_created
 */
class ProjectHistory extends \backend\components\db\AppModel
{


    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'project_history';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['projectName', 'description', 'secondDescription', 'moreDescription', 'createdAt', 'updatedAt', 'createdBy', 'updatedBy', 'valid', '_actionUUID', '_version', 'action', 'date_created'], 'default', 'value' => null],
            [['historyUUID', 'UUID', 'projectCode', 'user_id'], 'required'],
            [['valid', '_version'], 'integer'],
            [['historyUUID', 'UUID', 'createdAt', 'updatedAt', 'createdBy', 'updatedBy', '_actionUUID', 'user_id', 'action', 'date_created'], 'string', 'max' => 50],
            [['projectCode', 'projectName'], 'string', 'max' => 100],
            [['description'], 'string', 'max' => 500],
            [['secondDescription'], 'string', 'max' => 750],
            [['moreDescription'], 'string', 'max' => 1000],
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
            'user_id' => 'User ID',
            'action' => 'Action',
            'date_created' => 'Date Created',
        ];
    }

    /**
     * {@inheritdoc}
     * @return \backend\modules\project\data\query\ProjectHistoryQuery the active query used by this AR class.
     */
    public static function find()
    {
        return new \backend\modules\project\data\query\ProjectHistoryQuery(get_called_class());
    }

}
