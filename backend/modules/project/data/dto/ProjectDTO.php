<?php

namespace backend\modules\project\data\dto;

use yii\base\Model;


class ProjectDTO extends Model {
    public ?string $UUID = null;
    public ?string $projectCode = null;
    public ?string $projectName = null;
    public ?string $description = null;
    public ?string $secondDescription = null;
    public ?string $moreDescription = null;
    public ?string $createdAtFormat = null;
    public ?string $createdByName = null;
    public ?string $updatedAtFormat = null;
    public ?string $updatedByName = null;
    
    
    public function rules()
    {
        return [[
            ['UUID', 'projectCode', 'projectName', 'description', 'secondDescription',
            'moreDescription', 'createdAtFormat', 'createdByName', 'updatedAtFormat', 'updatedByName'
            ],
            'safe'
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
