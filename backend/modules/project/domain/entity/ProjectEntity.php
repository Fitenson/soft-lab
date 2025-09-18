<?php

namespace backend\modules\project\domain\entity;

use backend\components\entity\Entity;
use backend\modules\project\data\dto\ProjectDTO;
use backend\modules\project\data\models\Project;

class ProjectEntity extends Entity {
    protected string $DTOClassName = ProjectDTO::class;

    private ?string $UUID;
    private ?string $projectCode;
    private string $projectName;
    private ?string $description;
    private ?string $secondDescription;
    private ?string $moreDescription;
    private ?string $createdAtFormat;
    private ?string $createdByName;
    private ?string $updatedAtFormat;
    private ?string $updatedByName;


    public function asArray(): array
    {
        return get_object_vars($this);
    }


    public function setUUID(?string $UUID = null): void
    {
        $this->UUID = $UUID;
    }

    public function setProjectCode(?string $projectCode = null): void
    {
        $this->projectCode = !empty($projectCode) ? $projectCode : $this->generateAutoNumber(Project::class, 'projectCode', 'PRJmmdd????');
    }

    public function setProjectName(string $projectName): void
    {
        $this->projectName = $projectName;
    }

    public function setDescription(?string $description): void
    {
        $this->description = $description;
    }

    public function setSecondDescription(?string $secondDescription): void
    {
        $this->secondDescription = $secondDescription;
    }

    public function setMoreDescription(?string $moreDescription): void
    {
        $this->moreDescription = $moreDescription;
    }


    public function getUUID(): ?string
    {
        return $this->UUID;
    }

    public function getProjectCode(): ?string
    {
        return $this->projectCode;
    }

    public function getProjectName(): string
    {
        return $this->projectName;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function getSecondDescription(): ?string
    {
        return $this->secondDescription;
    }

    public function getMoreDescription(): ?string
    {
        return $this->moreDescription;
    }
}
