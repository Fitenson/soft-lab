<?php

namespace backend\controllers;

use yii\filters\auth\HttpBasicAuth;
use yii\filters\Cors;
use yii\rest\ActiveController;

use backend\modules\user\data\models\User;
use Yii;

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


    protected function verbs()
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
                if(!$User || !$User->validateAccessToken($password)) {
                    Yii::$app->exception->throw('Invalid credentials', 401);
                }
                return $User;
            }
        ];

        return $behaviours;
    }
}
