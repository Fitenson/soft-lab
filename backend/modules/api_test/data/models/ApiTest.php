<?php

namespace backend\modules\api_test\data\models;

use Yii;

use backend\modules\client_database\data\models\ClientDatabase;
use backend\modules\project\data\models\Project;
use backend\modules\user\data\models\User;

/**
 * This is the model class for table "apiTest".
 *
 * @property string $UUID
 * @property string|null $parentApiTest
 * @property string $clientDatabase
 * @property string $project
 * @property string $testName
 * @property string $useCase
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
 */
class ApiTest extends \backend\components\db\AppModel
{


    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'apiTest';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['parentApiTest', 'description', 'moreDescription', 'data', 'transmission', 'scenario', 'createdAt', 'updatedAt', 'createdBy', 'updatedBy', 'valid', '_actionUUID', '_version'], 'default', 'value' => null],
            [['UUID', 'clientDatabase', 'project', 'testName', 'useCase'], 'required'],
            [['data', 'output', 'scenario'], 'string'],
            [['valid', '_version'], 'integer'],
            [['UUID', 'parentApiTest', 'clientDatabase', 'project', 'createdAt', 'createdBy', '_actionUUID'], 'string', 'max' => 40],
            [['testName', 'useCase'], 'string', 'max' => 50],
            [['description'], 'string', 'max' => 255],
            [['moreDescription'], 'string', 'max' => 500],
            [['transmission', 'updatedAt', 'updatedBy'], 'string', 'max' => 30],
            [['UUID'], 'unique'],
            [['clientDatabase'], 'exist', 'skipOnError' => true, 'targetClass' => ClientDatabase::class, 'targetAttribute' => ['clientDatabase' => 'UUID']],
            [['createdBy'], 'exist', 'skipOnError' => true, 'targetClass' => User::class, 'targetAttribute' => ['createdBy' => 'UUID']],
            [['parentApiTest'], 'exist', 'skipOnError' => true, 'targetClass' => ApiTest::class, 'targetAttribute' => ['parentApiTest' => 'UUID']],
            [['project'], 'exist', 'skipOnError' => true, 'targetClass' => Project::class, 'targetAttribute' => ['project' => 'UUID']],
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
            'parentApiTest' => 'Parent Api Test',
            'clientDatabase' => 'Client Database',
            'project' => 'Project',
            'testName' => 'Test Name',
            'useCase' => 'Use Case',
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
        ];
    }

    /**
     * {@inheritdoc}
     * @return \backend\modules\api_test\data\query\ApiTestQuery the active query used by this AR class.
     */
    public static function find()
    {
        return new \backend\modules\api_test\data\query\ApiTestQuery(get_called_class());
    }

}
