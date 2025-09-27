<?php

namespace backend\modules\api_test\data\models;

use Yii;
use backend\modules\api_test\data\query\ApiTestHistoryQuery;

/**
 * This is the model class for table "apiTest_history".
 *
 * @property string $historyUUID
 * @property string $UUID
 * @property string|null $parentApiTest
 * @property string $clientDatabase
 * @property string $project
 * @property string $testName
 * @property int $seq
 * @property string|null $description
 * @property string|null $moreDescription
 * @property string|null $data
 * @property string|null $output
 * @property string|null $transmission
 * @property string|null $scenario
 * @property string|null $createdAt
 * @property string|null $updatedAt
 * @property string|null $createdBy
 * @property string|null $updatedBy
 * @property int|null $valid
 * @property string|null $_actionUUID
 * @property int|null $_version
 * @property string $user_id
 * @property string $action
 * @property string $date_created
 */
class ApiTestHistory extends \backend\components\db\AppModel
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'apiTest_history';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['parentApiTest', 'description', 'moreDescription', 'data', 'output', 'transmission', 'scenario', 'createdAt', 'updatedAt', 'createdBy', 'updatedBy', 'valid', '_actionUUID', '_version'], 'default', 'value' => null],
            [['historyUUID', 'UUID', 'clientDatabase', 'project', 'testName', 'seq', 'user_id', 'action', 'date_created'], 'required'],
            [['seq', 'valid', '_version'], 'integer'],
            [['data', 'output', 'scenario'], 'string'],
            [['historyUUID', 'UUID', 'parentApiTest', 'clientDatabase', 'project', 'createdAt', 'createdBy', '_actionUUID', 'user_id'], 'string', 'max' => 40],
            [['testName'], 'string', 'max' => 50],
            [['description'], 'string', 'max' => 255],
            [['moreDescription'], 'string', 'max' => 500],
            [['transmission', 'updatedAt', 'updatedBy', 'action', 'date_created'], 'string', 'max' => 30],
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
            'parentApiTest' => 'Parent Api Test',
            'clientDatabase' => 'Client Database',
            'project' => 'Project',
            'testName' => 'Test Name',
            'seq' => 'Seq',
            'description' => 'Description',
            'moreDescription' => 'More Description',
            'data' => 'Data',
            'output' => 'Output',
            'transmission' => 'Transmission',
            'scenario' => 'Scenario',
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


    public static function find()
    {
        return new ApiTestHistoryQuery(get_called_class());
    }
}
