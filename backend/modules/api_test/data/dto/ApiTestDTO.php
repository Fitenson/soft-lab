<?php

namespace backend\modules\api_test\data\dto;

use JsonSerializable;
use yii\base\Model;


class ApiTestDTO extends Model implements JsonSerializable {
    public ?string $UUID;
    public ?string $parentApiTest;
    public ?string $clientDatabase;
    public ?string $project;
    public ?string $testName;
    public ?string $useCase;
    public ?int $seq;
    public ?string $description;
    public ?string $moreDescription;
    public ?string $data;
    public ?string $output;
    public ?string $transmission;
    public ?string $scenario;


    public function rules()
    {
        return [[
            ['UUID', 'parentApiTest', 'project', 'clientDatabase', 'testName',
            'useCase', 'description', 'moreDescription', 'data', 'transmission',
            'scenario', 'output', 'seq'
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
