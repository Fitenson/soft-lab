<?php

namespace backend\modules\user\data\dto;

use JsonSerializable;
use yii\base\Model;


class UserDTO extends Model {
    public ?string $UUID = null;
    public ?string $username = null;
    public ?string $fullName = null;
    public ?string $email = null;
    public ?string $role = null;
    public ?string $gender = null;
    public ?string $title = null;
    public ?string $phoneNo = null;
    public ?string $description = null;
    public ?string $address = null;
    public ?string $createdAtFormat = null;
    public ?string $createdByName = null;
    public ?string $updatedAtFormat = null;
    public ?string $updatedByName = null;


    public function rules()
    {
        return [[
            ['UUID', 'username', 'fullName', 'email', 'gender', 
            'title', 'phoneNo', 'description', 'address', 'role',
            'createdAtFormat', 
            'createdByName', 'updatedAtFormat', 'updatedByName'
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
