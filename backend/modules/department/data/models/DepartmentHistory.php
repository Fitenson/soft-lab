<?php

namespace backend\modules\department\data\models;

use Yii;

/**
 * This is the model class for table "department_history".
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
 * @property string $historyUUID
 * @property string $user_id
 * @property string|null $action
 * @property string|null $date_created
 */
class DepartmentHistory extends \backend\components\db\AppModel
{


    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'department_history';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['head', 'description', 'createdAt', 'updatedAt', 'createdBy', 'updatedBy', 'valid', '_actionUUID', '_version', 'action', 'date_created'], 'default', 'value' => null],
            [['UUID', 'departmentID', 'departmentName', 'historyUUID', 'user_id'], 'required'],
            [['valid', '_version'], 'integer'],
            [['UUID', 'head', 'createdAt', 'updatedAt', 'createdBy', 'updatedBy', '_actionUUID', 'historyUUID', 'user_id', 'action', 'date_created'], 'string', 'max' => 50],
            [['departmentID', 'departmentName'], 'string', 'max' => 100],
            [['description'], 'string', 'max' => 1000],
            [['historyUUID'], 'unique'],
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
            'historyUUID' => 'History Uuid',
            'user_id' => 'User ID',
            'action' => 'Action',
            'date_created' => 'Date Created',
        ];
    }

}
