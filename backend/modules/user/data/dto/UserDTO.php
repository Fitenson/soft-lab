<?php

namespace backend\modules\user\data\dto;

use JsonSerializable;
use yii\base\Model;


class UserDTO extends Model implements JsonSerializable {
    public ?string $UUID;
    public ?string $username;
    public ?string $fullName;
    public ?string $email;
    public ?string $gender;
    public ?string $title;
    public ?string $phoneNo;
    public ?string $description;
    public ?string $address;
    public ?string $createdAtFormat;
    public ?string $createdByName;
    public ?string $updatedAtFormat;
    public ?string $updatedByName;


    public function rules()
    {
        return [[
            [
                'UUID', 'username', 'fullName', 'email', 'gender', 'title', 'phoneNo', 'description', 'address',
                'createdAtFormat', 'createdByName', 'updatedAtFormat', 'updatedByName'
            ],
            'safe'
        ]];
    }


    public function jsonSerialize(): array
    {
        return parent::toArray();
    }


    public function asArray(): array
    {
        return $this->jsonSerialize();
    }
}
