<?php

namespace backend\modules\api_test\data\models;

use Yii;

/**
 * This is the model class for table "apiTestHasScenario_history".
 *
 * @property string $historyUUID
 * @property string $UUID
 * @property string $apiTest
 * @property string|null $apiTestHasData
 * @property string|null $apiTestHasOutput
 * @property string|null $scenario
 * @property int $seq
 * @property string|null $description
 * @property string|null $moreDescription
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
class ApiTestHasScenarioHistory extends \backend\components\db\AppModel
{


    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'apiTestHasScenario_history';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['apiTestHasData', 'apiTestHasOutput', 'scenario', 'description', 'moreDescription', 'createdAt', 'updatedAt', 'createdBy', 'updatedBy', 'valid', '_actionUUID', '_version'], 'default', 'value' => null],
            [['historyUUID', 'UUID', 'apiTest', 'seq', 'user_id', 'action', 'date_created'], 'required'],
            [['seq', 'valid', '_version'], 'integer'],
            [['historyUUID', 'UUID', 'apiTest', 'apiTestHasData', 'apiTestHasOutput', 'createdAt', 'createdBy', '_actionUUID', 'user_id'], 'string', 'max' => 40],
            [['scenario'], 'string', 'max' => 100],
            [['description'], 'string', 'max' => 255],
            [['moreDescription'], 'string', 'max' => 500],
            [['updatedAt', 'updatedBy', 'action', 'date_created'], 'string', 'max' => 30],
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
            'apiTest' => 'Api Test',
            'apiTestHasData' => 'Api Test Has Data',
            'apiTestHasOutput' => 'Api Test Has Output',
            'scenario' => 'Scenario',
            'seq' => 'Seq',
            'description' => 'Description',
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
     * @return \backend\modules\api_test\data\query\ApiTestHasScenarioHistoryQuery the active query used by this AR class.
     */
    public static function find()
    {
        return new \backend\modules\api_test\data\query\ApiTestHasScenarioHistoryQuery(get_called_class());
    }

}
