<?php

namespace backend\modules\api_test\data\models;

use Yii;

use backend\modules\user\data\models\User;

/**
 * This is the model class for table "apiTestHasData".
 *
 * @property string $UUID
 * @property string $apiTest
 * @property string|null $fieldType
 * @property string|null $key
 * @property string|null $value
 * @property int $enabled
 * @property int $seq
 * @property string|null $description
 * @property string|null $createdAt
 * @property string|null $updatedAt
 * @property string|null $createdBy
 * @property string|null $updatedBy
 * @property int|null $valid
 * @property string|null $_actionUUID
 * @property int|null $_version
 */
class ApiTestHasData extends \backend\components\db\AppModel
{


    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'apiTestHasData';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['key', 'value', 'description', 'fieldType', 'createdAt', 'updatedAt', 'createdBy', 'updatedBy', 'valid', '_actionUUID', '_version'], 'default', 'value' => null],
            [['UUID', 'apiTest', 'enabled'], 'required'],
            [['value'], 'string'],
            [['enabled', 'seq', 'valid', '_version'], 'integer'],
            [['UUID', 'apiTest', 'createdAt', 'createdBy', '_actionUUID'], 'string', 'max' => 40],
            [['fieldType', 'key'], 'string', 'max' => 100],
            [['description'], 'string', 'max' => 500],
            [['updatedAt', 'updatedBy'], 'string', 'max' => 30],
            [['UUID'], 'unique'],
            [['apiTest'], 'exist', 'skipOnError' => true, 'targetClass' => ApiTest::class, 'targetAttribute' => ['apiTest' => 'UUID']],
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
            'apiTest' => 'Api Test',
            'fieldType' => 'Field Type',
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
        ];
    }


    /**
     * {@inheritdoc}
     * @return \backend\modules\api_test\data\query\ApiTestHasDataQuery the active query used by this AR class.
     */
    public static function find()
    {
        return new \backend\modules\api_test\data\query\ApiTestHasDataQuery(get_called_class());
    }

}
