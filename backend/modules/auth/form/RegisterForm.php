<?php

namespace backend\modules\auth\form;

use backend\components\form\Form;


class RegisterForm extends Form {
    public $username;
    public $fullName;
    public $email;
    public $password;


    public function rules()
    {
        return [
            [['username', 'fullName', 'email', 'password'], 'required'],
            ['username', 'string', 'min' => 3, 'max' => 100],
            ['fullName', 'string', 'min' => 3, 'max' => 255],
            ['email', 'email'],
            ['email', 'string', 'max' => 100],
            ['password', 'string', 'min' => 5, 'max' => 50]
        ];
    }


    public function toDto()
    {
        return [
            'username' => $this->username,
            'fullName' => $this->fullName,
            'email' => $this->email,
            'password' => $this->password,
        ];
    }
}
