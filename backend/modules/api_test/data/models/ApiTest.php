<?php

namespace backend\modules\api_test\data\models;

use Yii;
use backend\modules\api_test\data\query\ApiTestQuery;
use backend\modules\client_database\data\models\ClientDatabase;
use backend\modules\project\data\models\Project;
use backend\modules\user\data\models\User;


/**
 * This is the model class for table "apiTest".
 *
 * @property string $UUID
 * @property string|null $parentApiTest
 * @property string|null $tester
 * @property string $clientDatabase
 * @property string $project
 * @property string $testName
 * @property int $seq
 * @property int $isFolder
 * @property string|null $description
 * @property string|null $moreDescription
 * @property string|null $transmission
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
            [['parentApiTest', 'tester', 'description', 'moreDescription', 'transmission', 'createdAt', 'updatedAt', 'createdBy', 'updatedBy', 'valid', '_actionUUID', '_version'], 'default', 'value' => null],
            [['UUID', 'clientDatabase', 'project', 'testName', 'seq', 'isFolder'], 'required'],
            [['seq', 'isFolder', 'valid', '_version'], 'integer'],
            [['UUID', 'parentApiTest', 'tester', 'clientDatabase', 'project', 'createdAt', 'createdBy', '_actionUUID'], 'string', 'max' => 40],
            [['testName'], 'string', 'max' => 50],
            [['description'], 'string', 'max' => 255],
            [['moreDescription'], 'string', 'max' => 500],
            [['transmission', 'updatedAt', 'updatedBy'], 'string', 'max' => 30],
            [['UUID'], 'unique'],
            [['clientDatabase'], 'exist', 'skipOnError' => true, 'targetClass' => Clientdatabase::class, 'targetAttribute' => ['clientDatabase' => 'UUID']],
            [['createdBy'], 'exist', 'skipOnError' => true, 'targetClass' => User::class, 'targetAttribute' => ['createdBy' => 'UUID']],
            [['parentApiTest'], 'exist', 'skipOnError' => true, 'targetClass' => Apitest::class, 'targetAttribute' => ['parentApiTest' => 'UUID']],
            [['project'], 'exist', 'skipOnError' => true, 'targetClass' => Project::class, 'targetAttribute' => ['project' => 'UUID']],
            [['tester'], 'exist', 'skipOnError' => true, 'targetClass' => User::class, 'targetAttribute' => ['tester' => 'UUID']],
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
            'tester' => 'Tester',
            'clientDatabase' => 'Client Database',
            'project' => 'Project',
            'testName' => 'Test Name',
            'seq' => 'Seq',
            'isFolder' => 'Is Folder',
            'description' => 'Description',
            'moreDescription' => 'More Description',
            'transmission' => 'Transmission',
            'createdAt' => 'Created At',
            'updatedAt' => 'Updated At',
            'createdBy' => 'Created By',
            'updatedBy' => 'Updated By',
            'valid' => 'Valid',
            '_actionUUID' => 'Action Uuid',
            '_version' => 'Version',
        ];
    }


    public static function find()
    {
        return new ApiTestQuery(get_called_class());
    }
}
