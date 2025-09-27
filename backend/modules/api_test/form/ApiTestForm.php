<?php

namespace backend\modules\api_test\form;

use backend\components\form\Form;
use backend\modules\client_database\data\models\ClientDatabase;
use backend\modules\project\data\models\Project;
use backend\modules\api_test\data\models\ApiTest;


class ApiTestForm extends Form {
    public ?string $UUID = null;
    public ?string $parentApiTest = null;
    public ?string $clientDatabase = null;
    public ?string $project = null;
    public ?string $testName = null;
    public ?string $useCase = null;
    public ?int $seq = 0;
    public ?string $description = null;
    public ?string $moreDescription = null;
    public ?string $data = null;
    public ?string $output = null;
    public ?string $transmission = null;
    public ?string $scenario = null;


    public function rules()
    {
        return [
            [['parentApiTest', 'description', 'moreDescription', 'data', 'transmission', 'scenario'], 'default', 'value' => null],
            [['UUID', 'clientDatabase', 'project', 'testName', 'useCase', 'seq'], 'required'],
            [['data', 'output', 'scenario'], 'string'],
            [['parentApiTest', 'clientDatabase', 'project'], 'string', 'max' => 40],
            [['testName', 'useCase'], 'string', 'max' => 50],
            [['description'], 'string', 'max' => 255],
            [['moreDescription'], 'string', 'max' => 500],
            [['transmission'], 'string', 'max' => 30],
            [['clientDatabase'], 'exist', 'skipOnError' => true, 'targetClass' => ClientDatabase::class, 'targetAttribute' => ['clientDatabase' => 'UUID']],
            [['parentApiTest'], 'exist', 'skipOnError' => true, 'targetClass' => ApiTest::class, 'targetAttribute' => ['parentApiTest' => 'UUID']],
            [['project'], 'exist', 'skipOnError' => true, 'targetClass' => Project::class, 'targetAttribute' => ['project' => 'UUID']],
        ];
    }
}
