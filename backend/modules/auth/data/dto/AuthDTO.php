<?php

namespace backend\modules\auth\data\dto;

use JsonSerializable;
use yii\base\Model;


class AuthDTO extends Model implements JsonSerializable {
    public ?string $UUID;
    public ?string $username;
    public ?string $email;
    public ?string $fullName;
    public ?string $password;


    public function rules()
    {
        return [[
            ['UUID', 'username', 'fullName', 'email', 'password'],
            'safe'
        ]];
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
