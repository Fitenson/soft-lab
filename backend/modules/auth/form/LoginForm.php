<?php

namespace backend\modules\auth\form;

use backend\components\form\Form;


class LoginForm extends Form {
    public $username;
    public $password;


    public function rules()
    {
        return [
            [['username', 'password'], 'required'],
            ['username', 'string', 'min' => 3, 'max' => 100],
            ['password', 'string', 'min' => 5, 'max' => 50]
        ];
    }
}
