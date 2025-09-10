<?php

namespace backend\controllers;

use yii\filters\auth\HttpBasicAuth;
use yii\filters\Cors;
use yii\rest\ActiveController;

use backend\modules\user\data\models\User;


class RestController extends ActiveController {
    public $modelClass = '';

    public function __construct($id, $module = 'test', $config = [])
    {
        parent::__construct($id, $module, $config);
    }

    public function actions()
    {
        return [];
    }

    public function behaviors()
    {
        $behaviours = parent::behaviors();

        $behaviours['authenticator'] = [
            'class' => HttpBasicAuth::class,
            'auth' => function($username, $password) {
                $User = User::findOne(['username' => $username]);
                if($User && $User->validatePassword($password)) {
                    return $User;
                }
                return null;
            }
        ];

        return $behaviours;
    }
}
