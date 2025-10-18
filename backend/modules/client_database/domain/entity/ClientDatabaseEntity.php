<?php

namespace backend\modules\client_database\domain\entity;

use backend\components\entity\Entity;
use backend\modules\client_database\data\dto\ClientDatabaseDTO;


class ClientDatabaseEntity extends Entity {
    protected string $DTOClassName = ClientDatabaseDTO::class;

    private ?string $UUID;
    private string $databaseName;
    private string $databaseSchema;
    private string $host;
    private string $port;
    private string $username;
    private string $password;
    private string $project;


    public function asArray(): array
    {
        return get_object_vars($this);
    }


    public function setUUID(?string $UUID = null): void
    {
        $this->UUID = $UUID;
    }

    public function setDatabaseName(string $databaseName): void
    {
        $this->databaseName = $databaseName;
    }

    public function setDatabaseSchema(string $databaseSchema): void
    {
        $this->databaseSchema = $databaseSchema;
    }

    public function setHost(string $host): void
    {
        $this->host = $host;
    }

    public function setPort(string $port): void
    {
        $this->port = $port;
    }

    public function setUsername(string $username): void
    {
        $this->username = $username;
    }

    public function setPassword(string $password): void
    {
        $this->password = $password;
    }

    public function setProject(string $project): void
    {
        $this->project = $project;
    }


    public function getUUID(): string
    {
        return $this->UUID;
    }

    public function getDatabaseName(): string
    {
        return $this->databaseName;
    }

    public function getDatabaseSchema(): string
    {
        return $this->databaseSchema;
    }

    public function getHost(): string
    {
        return $this->host;
    }

    public function getPort(): string
    {
        return $this->port;
    }

    public function getUsername(): string
    {
        return $this->username;
    }

    public function getPassword(): string
    {
        return $this->password;
    }

    public function getProject(): string
    {
        return $this->project;
    }

    public function getDsn(): string
    {
        return sprintf(
            'mysql:host=%s;dbname=%s;charset=utf8',
            $this->getHost(),
            $this->getDatabaseSchema()
        );
    }
}
