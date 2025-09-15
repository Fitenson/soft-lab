<?php

namespace backend\modules\user\form;

use backend\components\form\Form;
use backend\modules\user\data\models\User;


class UserForm extends Form {
    public ?string $UUID = null;
    public ?string $username = null;
    public ?string $fullName = null;
    public ?string $gender = null;
    public ?string $role = null;
    public ?string $title = null;
    public ?string $email = null;
    public ?string $phoneNo = null;
    public ?string $description = null;
    public ?string $address = null;
    public ?string $valid = null;
    

    public function rules()
    {
        return [
            [['fullName', 'gender', 'title', 'phoneNo', 'description', 'address', 'role', 'valid'], 'default', 'value' => null],
            [['username', 'email'], 'required'],
            ['email', 'email'],
            ['username', 'unique', 
                'targetClass' => User::class, 
                'targetAttribute' => 'username',
                'filter' => function($query) {
                    if ($this->UUID) {
                        $query->andWhere(['<>', 'UUID', $this->UUID]);
                    }
                }
            ],
            ['email', 'unique', 
                'targetClass' => User::class, 
                'targetAttribute' => 'email',
                'filter' => function($query) {
                    if ($this->UUID) {
                        $query->andWhere(['<>', 'UUID', $this->UUID]);
                    }
                }
            ],
            [['valid'], 'integer'],
            [['gender', 'title', 'role'], 'string', 'max' => 50],
            [['username', 'phoneNo', 'email'], 'string', 'max' => 100],
            [['fullName'], 'string', 'max' => 255],
            [['description', 'address'], 'string', 'max' => 500],
        ];
    }
}
