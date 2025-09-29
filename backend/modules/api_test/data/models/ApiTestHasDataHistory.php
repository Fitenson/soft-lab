<?php

namespace backend\modules\api_test\data\models;

use Yii;

/**
 * This is the model class for table "apiTestHasData_history".
 *
 * @property string $historyUUID
 * @property string $UUID
 * @property string $apiTest
 * @property string|null $key
 * @property string|null $value
 * @property int $enabled
 * @property string|null $description
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
class ApiTestHasDataHistory extends \backend\components\db\AppModel
{


    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'apiTestHasData_history';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['key', 'value', 'description', 'createdAt', 'updatedAt', 'createdBy', 'updatedBy', 'valid', '_actionUUID', '_version'], 'default', 'value' => null],
            [['historyUUID', 'UUID', 'apiTest', 'enabled', 'user_id', 'action', 'date_created'], 'required'],
            [['value'], 'string'],
            [['enabled', 'valid', '_version'], 'integer'],
            [['historyUUID', 'UUID', 'apiTest', 'createdAt', 'createdBy', '_actionUUID', 'user_id'], 'string', 'max' => 40],
            [['key'], 'string', 'max' => 100],
            [['description'], 'string', 'max' => 500],
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
            'key' => 'Key',
            'value' => 'Value',
            'enabled' => 'Enabled',
            'description' => 'Description',
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
     * @return \backend\modules\api_test\data\query\ApiTestHasDataHistory the active query used by this AR class.
     */
    public static function find()
    {
        return new \backend\modules\api_test\data\query\ApiTestHasDataHistory(get_called_class());
    }

}
