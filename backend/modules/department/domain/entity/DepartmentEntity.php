<?php

namespace backend\modules\department\domain\entity;

use backend\components\entity\Entity;
use backend\modules\department\data\dto\DepartmentDTO;


class DepartmentEntity extends Entity {
    protected string $DTOClassName = DepartmentDTO::class;

    private string $UUID;
    private string $departmentID;
    private string $departmentName;
    private string $head;
    private string $headDepartmentName;
    private string $description;


    public function asArray(): array
    {
        return get_object_vars($this);
    }


    public function setUUID(string $UUID): void
    {
        $this->UUID = $UUID;
    }

    public function setDepartmentID(string $departmentID): void
    {
        $this->departmentID = $departmentID;
    }

    public function setDepartmentName(string $departmentName): void
    {
        $this->departmentName = $departmentName;
    }
    
    public function setHead(string $head): void
    {
        $this->head = $head;
    }

    public function setHeadDepartmentName(string $headDepartmentName): void
    {
        $this->headDepartmentName = $headDepartmentName;
    }

    public function setDescription(string $description): void
    {
        $this->description = $description;
    }


    public function getUUID(): string
    {
        return $this->UUID;
    }

    public function getDepartmentID(): string
    {
        return $this->departmentID;
    }

    public function getDepartmentName(): string
    {
        return $this->departmentName;
    }

    public function getHead(): string
    {
        return $this->head;
    }

    public function getHeadDepartmentName(): string
    {
        return $this->headDepartmentName;
    }

    public function getDescription(): string
    {
        return $this->description;
    }
}
