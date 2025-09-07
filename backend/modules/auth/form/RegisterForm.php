<?php

namespace backend\modules\auth\form;

use backend\components\form\Form;
use backend\modules\user\data\models\User;


class RegisterForm extends Form {
    public ?string $username = null;
    public ?string $fullName = null;
    public ?string $email = null;
    public ?string $password = null;
    

    public function rules()
    {
        return [
            [['username', 'fullName', 'email', 'password'], 'required'],

            ['username', 'string', 'min' => 3, 'max' => 100],
            ['username', 'unique',
                'targetClass' => User::class,
                'targetAttribute' => 'username',
                'message' => 'This username has already been taken.'
            ],

            ['fullName', 'string', 'min' => 3, 'max' => 255],

            ['email', 'email'],
            ['email', 'string', 'max' => 100],
            ['email', 'unique',
                'targetClass' => User::class,
                'targetAttribute' => 'email',
                'message' => 'This email has already been taken.'
            ],

            ['password', 'string', 'min' => 5, 'max' => 50],
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
