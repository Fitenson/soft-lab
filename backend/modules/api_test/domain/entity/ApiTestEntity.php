<?php

namespace backend\modules\api_test\domain\entity;

use backend\components\entity\Entity;
use backend\modules\api_test\data\dto\ApiTestDTO;


class ApiTestEntity extends Entity {
    protected string $DTOClassName = ApiTestDTO::class;

    private ?string $UUID;
    private ?string $parentApiTest;
    private string $clientDatabase;
    private string $project;
    private string $testName;
    private int $seq;
    private int $isFolder;
    private ?string $description;
    private ?string $moreDescription;
    private ?string $data;
    private ?string $output;
    private string $transmission;
    private ?string $scenario;


    public function asArray(): array
    {
        return get_object_vars($this);
    }

    public function setUUID(?string $UUID = null): void
    {
        $this->UUID = $UUID;
    }

    public function getUUID(): ?string
    {
        return $this->UUID;
    }

    public function setParentApiTest(?string $parentApiTest = null): void
    {
        $this->parentApiTest = $parentApiTest;
    }

    public function getParentApiTest(): ?string
    {
        return $this->parentApiTest;
    }

    public function setClientDatabase(string $clientDatabase): void
    {
        $this->clientDatabase = $clientDatabase;
    }

    public function getClientDatabase(): string
    {
        return $this->clientDatabase;
    }

    public function setProject(string $project): void
    {
        $this->project = $project;
    }

    public function getProject(): string
    {
        return $this->project;
    }

    public function setTestName(string $testName): void
    {
        $this->testName = $testName;
    }

    public function getTestName(): string
    {
        return $this->testName;
    }

    public function setDescription(?string $description = null): void
    {
        $this->description = $description;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setMoreDescription(?string $moreDescription = null): void
    {
        $this->moreDescription = $moreDescription;
    }

    public function getMoreDescription(): ?string
    {
        return $this->moreDescription;
    }

    public function setData(?string $data = null): void
    {
        $this->data = $data;
    }

    public function getData(): ?string
    {
        return $this->data;
    }

    public function setOutput(?string $output = null): void
    {
        $this->output = $output;
    }

    public function getOutput(): ?string
    {
        return $this->output;
    }

    public function setIsFolder(int $isFolder): void
    {
        $this->isFolder = $isFolder;
    }

    public function getIsFolder(): ?string
    {
        return $this->isFolder;
    }

    public function setTransmission(?string $transmission = null): void
    {
        $this->transmission = $transmission;
    }

    public function getTransmission(): ?string
    {
        return $this->transmission;
    }

    public function setScenario(?string $scenario = null): void
    {
        $this->scenario = $scenario;
    }

    public function getScenario(): ?string
    {
        return $this->scenario;
    }

    public function setSeq(int $seq): void
    {
        $this->seq = $seq;
    }

    public function getSeq(): int
    {
        return $this->seq;
    }
}
