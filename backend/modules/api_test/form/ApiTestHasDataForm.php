<?php

namespace backend\modules\api_test\form;

use backend\components\form\Form;
use backend\modules\api_test\data\models\ApiTest;


class ApiTestHasDataForm extends Form {
    public ?string $UUID = null;
    public ?string $apiTest = null;
    public ?string $fieldType = null;
    public ?string $key = null;
    public ?string $value = null;
    public ?int $enabled = 1;
    public ?string $description = null;


    public function rules()
    {
        return [
            [['key', 'value', 'description'], 'default', 'value' => null],
            [['UUID', 'apiTest', 'fieldType', 'enabled'], 'required'],
            [['value'], 'string'],
            [['enabled'], 'integer'],
            [['fieldType', 'key'], 'string', 'max' => 100],
            [['description'], 'string', 'max' => 500],
            [['apiTest'], 'exist', 'skipOnError' => true, 'targetClass' => ApiTest::class, 'targetAttribute' => ['apiTest' => 'UUID']],
        ];
    }
}
