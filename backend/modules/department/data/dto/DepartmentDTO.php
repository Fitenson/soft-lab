<?php

namespace backend\modules\department\data\dto;

use JsonSerializable;


class DepartmentDTO implements JsonSerializable {
    public string $UUID;
    public string $departmentID;
    public string $departmentName;
    public string $head;
    public string $headDepartmentName;
    public string $description;
    public string $createdAtFormat;
    public string $createdByName;
    public string $updatedAtFormat;
    public string $updatedByName;


    public function __construct(array $data)
    {
        $this->UUID = $data['UUID'];
        $this->departmentID = $data['departmentID'];
        $this->departmentName = $data['departmentName'];
        $this->head = $data['head'];
        $this->headDepartmentName = $data['headDepartmentName'];
        $this->description = $data['description'];
        $this->createdAtFormat = $data['createdAtFormat'];
        $this->createdAtFormat = $data['createdAtByName'];
        $this->updatedAtFormat = $data['updatedAtFormat'];
        $this->updatedByName = $data['updatedByName'];
    }


    public function jsonSerialize(): array
    {
        return get_object_vars($this);
    }


    public function asArray(): array
    {
        return $this->jsonSerialize();
    }
}
