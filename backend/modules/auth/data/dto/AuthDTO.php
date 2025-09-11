<?php

namespace backend\modules\auth\data\dto;

use JsonSerializable;


class AuthDTO implements JsonSerializable {
    public string $UUID;
    public string $username;
    public string $email;
    public string $fullName;
    public string $password;


    public function __construct(array $data)
    {
        $this->UUID = $data['UUID'];
        $this->fullName = $data['fullName'];
        $this->username = $data['username'];
        $this->email = $data['email'];
        $this->password = $data['password'];
    }

    
    public function jsonSerialize(): array
    {
        return get_object_vars($this);
    }


    public function asArray() : array
    {
        return $this->jsonSerialize();
    }
}
