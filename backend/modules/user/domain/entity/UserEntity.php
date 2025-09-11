<?php

namespace backend\modules\user\domain\entity;

use backend\components\entity\Entity;
use backend\modules\user\data\dto\UserDTO;

class UserEntity extends Entity {
    protected string $DTOClassName = UserDTO::class;

    private string $UUID;
    private string $username;
    private string $fullName;
    private string $email;
    private string $gender;
    private string $title;
    private string $phoneNo;
    private string $description;
    private string $address;
    private string $createdAtFormat;
    private string $createdByName;
    private string $updatedAtFormat;
    private string $updatedByName;


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

    public function setGender(string $gender): void
    {
        $this->gender = $gender;
    }

    public function setTitle(string $title): void
    {
        $this->title = $title;
    }

    public function setPhoneNo(string $phoneNo): void
    {
        $this->phoneNo = $phoneNo;
    }

    public function setDescription(string $description): void
    {
        $this->description = $description;
    }

    public function setAddress(string $address): void
    {
        $this->address = $address;
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

    public function getGender(): string
    {
        return $this->gender;
    }

    public function getTitle(): string
    {
        return $this->title;
    }

    public function getPhoneNo(): string
    {
        return $this->phoneNo;
    }

    public function getDescription(): string
    {
        return $this->description;
    }

    public function getAddress(): string
    {
        return $this->address;
    }

    public function getCreatedAtFormat(): string
    {
        return $this->createdAtFormat;
    }

    public function getCreatedByName(): string
    {
        return $this->createdByName;
    }

    public function getUpdatedAtFormat(): string
    {
        return $this->updatedAtFormat;
    }

    public function getUpdatedByName(): string
    {
        return $this->updatedByName;
    }
}
