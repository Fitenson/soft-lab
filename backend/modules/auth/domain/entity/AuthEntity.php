<?php

namespace backend\modules\auth\domain\entity;

use backend\components\entity\Entity;
use backend\modules\auth\data\dto\AuthDTO;


class AuthEntity extends Entity {
    protected string $DTOClassName = AuthDTO::class;

    private string $UUID;
    private string $username;
    private string $email;
    private string $fullName;
    private string $password;


    public function asArray(): array
    {
        return get_object_vars($this);
    }


    public function setUUID(string $UUID): void
    {
        $this->UUID = $UUID;
    }

    public function setUsername(string $username): void
    {
        $this->username = $username;
    }

    public function setFullName(string $fullName): void
    {
        $this->fullName = $fullName;
    }
    
    public function setEmail(string $email): void
    {
        $this->email = $email;
    }

    public function setPassword(string $password): void
    {
        $this->password = $password;
    }


    public function getUUID(): string
    {
        return $this->UUID;
    }

    public function getUsername(): string
    {
        return $this->username;
    }

    public function getFullName(): string
    {
        return $this->fullName;
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function getPassword(): string
    {
        return $this->password;
    }
}
