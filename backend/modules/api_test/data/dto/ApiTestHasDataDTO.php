<?php

namespace backend\modules\api_test\data\dto;

use JsonSerializable;
use yii\base\Model;


class ApiTestHasDataDTO extends Model implements JsonSerializable {
    public ?string $UUID = null;
    public ?string $apiTest = null;
    public ?string $fieldType = null;
    public ?string $key = null;
    public ?string $value = null;
    public int $enabled = 1;
    public ?int $seq = 1;
    public ?string $description = null;


    public function rules()
    {
        return [[
            ['UUID', 'apiTest', 'fieldType', 'key', 'value',
            'enabled', 'seq', 'description'
            ],'safe'
        ]];
    }


    public function jsonSerialize(): array
    {
        return parent::toArray();
    }


    public function asArray(): array
    {
        return $this->jsonSerialize();
    }    
}
