<?php

namespace backend\modules\auth\data\dto;


class AuthDTO {
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
}
