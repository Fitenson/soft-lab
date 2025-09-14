<?php

namespace backend\modules\department\data\dto;

use JsonSerializable;
use yii\base\Model;


class DepartmentDTO extends Model implements JsonSerializable {
    public ?string $UUID;
    public ?string $departmentID;
    public ?string $departmentName;
    public ?string $head;
    public ?string $headDepartmentName;
    public ?string $description;
    public ?string $createdAtFormat;
    public ?string $createdByName;
    public ?string $updatedAtFormat;
    public ?string $updatedByName;


    public function jsonSerialize(): array
    {
        return $this->attributes();
    }


    public function asArray(): array
    {
        return $this->jsonSerialize();
    }
}
