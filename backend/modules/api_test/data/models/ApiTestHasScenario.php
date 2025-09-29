<?php

namespace backend\modules\api_test\data\models;

use Yii;

use backend\modules\user\data\models\User;

/**
 * This is the model class for table "apiTestHasScenario".
 *
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
 */
class ApiTestHasScenario extends \backend\components\db\AppModel
{


    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'apiTestHasScenario';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['apiTestHasData', 'apiTestHasOutput', 'scenario', 'description', 'moreDescription', 'createdAt', 'updatedAt', 'createdBy', 'updatedBy', 'valid', '_actionUUID', '_version'], 'default', 'value' => null],
            [['UUID', 'apiTest', 'seq'], 'required'],
            [['seq', 'valid', '_version'], 'integer'],
            [['UUID', 'apiTest', 'apiTestHasData', 'apiTestHasOutput', 'createdAt', 'createdBy', '_actionUUID'], 'string', 'max' => 40],
            [['scenario'], 'string', 'max' => 100],
            [['description'], 'string', 'max' => 255],
            [['moreDescription'], 'string', 'max' => 500],
            [['updatedAt', 'updatedBy'], 'string', 'max' => 30],
            [['UUID'], 'unique'],
            [['apiTest'], 'exist', 'skipOnError' => true, 'targetClass' => Apitest::class, 'targetAttribute' => ['apiTest' => 'UUID']],
            [['apiTestHasData'], 'exist', 'skipOnError' => true, 'targetClass' => ApiTestHasData::class, 'targetAttribute' => ['apiTestHasData' => 'UUID']],
            [['apiTestHasOutput'], 'exist', 'skipOnError' => true, 'targetClass' => ApitestHasOutput::class, 'targetAttribute' => ['apiTestHasOutput' => 'UUID']],
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
        ];
    }

    /**
     * {@inheritdoc}
     * @return \backend\modules\api_test\data\query\ApiTestHasScenarioQuery the active query used by this AR class.
     */
    public static function find()
    {
        return new \backend\modules\api_test\data\query\ApiTestHasScenarioQuery(get_called_class());
    }

}
