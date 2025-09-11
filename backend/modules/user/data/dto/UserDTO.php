<?php

namespace backend\modules\user\data\dto;


class UserDTO {
    public string $UUID;
    public string $username;
    public string $fullName;
    public string $email;
    public string $gender;
    public string $title;
    public string $phoneNo;
    public string $description;
    public string $address;
    public string $createdAtFormat;
    public string $createdByName;
    public string $updatedAtFormat;
    public string $updatedByName;


    public function __construct(array $data)
    {
        $this->UUID = $data['UUID'];
        $this->username = $data['username'];
        $this->fullName = $data['fullName'];
        $this->email = $data['email'];
        $this->gender = $data['gender'];
        $this->title = $data['title'];
        $this->phoneNo = $data['phoneNo'];
        $this->description = $data['description'];

        $this->address = $data['address'];
        $this->createdAtFormat = $data['createdAtFormat'];
        $this->createdByName = $data['createdByName'];
        $this->updatedAtFormat = $data['updatedAtFormat'];
        $this->updatedByName = $data['updatedByName'];
    }
}
