<?php

namespace backend\modules\api_test\data\dto;

use JsonSerializable;
use yii\base\Model;


class ApiTestDTO extends Model implements JsonSerializable {
    public ?string $UUID = null;
    public ?string $parentApiTest = null;
    public ?string $clientDatabase = null;
    public ?string $project = null;
    public ?string $testName = null;
    public ?int $seq = null;
    public ?int $isFolder = null;
    public ?string $description = null;
    public ?string $moreDescription = null;
    public ?string $data = null;
    public ?string $output = null;
    public ?string $transmission = null;
    public ?string $scenario = null;


    public function rules()
    {
        return [[
            ['UUID', 'parentApiTest', 'project', 'clientDatabase', 'testName',
            'description', 'moreDescription', 'data', 'transmission' ,'scenario',
            'output', 'seq', 'isFolder'
            ],'safe'
        ]];
    }
    

    public function jsonSerialize(): array
    {
        return $this->getAttributes();
    }

    public function asArray(): array
    {
        return $this->jsonSerialize();
    }
}
