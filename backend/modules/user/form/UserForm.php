<?php

namespace backend\modules\user\form;

use backend\components\form\Form;
use backend\modules\user\data\models\User;


class UserForm extends Form {
    public ?string $UUID = null;
    public ?string $username = null;
    public ?string $fullName = null;
    public ?string $gender = null;
    public ?string $title = null;
    public ?string $email = null;
    public ?string $phoneNo = null;
    public ?string $description = null;
    public ?string $address = null;
    public ?string $valid = null;
    

    public function rules()
    {
        return [
            [['fullName', 'gender', 'title', 'phoneNo', 'description', 'address', 'valid'], 'default', 'value' => null],
            [['UUID', 'username', 'email'], 'required'],
            [['valid', '_version'], 'integer'],
            [['UUID', 'gender', 'title'], 'string', 'max' => 50],
            [['username', 'phoneNo', 'email'], 'string', 'max' => 100],
            [['fullName'], 'string', 'max' => 255],
            [['description', 'address'], 'string', 'max' => 500],
            [['username'], 'unique'],
            [['email'], 'unique'],
            [['UUID'], 'unique'],
        ];
    }



    public function asArray()
    {
        return [
            'username' => $this->username,
            'fullName' => $this->fullName,
            'email' => $this->email,
            'password' => $this->password,
        ];
    }
}
