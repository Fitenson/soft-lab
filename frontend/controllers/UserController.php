<?php

namespace frontend\controllers;

use Yii;
use common\components\inertia\InertiaController;
use backend\modules\user\domain\service\UserService;


class UserController extends InertiaController {
    private UserService $userService;

    public function init()
    {
        parent::init();
        $this->userService = Yii::$container->get(UserService::class);        
    }


    public function actionIndex()
    {
        return $this->inertia('user/index');
    }


    public function actionCreate()
    {
        return $this->inertia('user/form');
    }


    public  function actionView(string $id) 
    {
        $userDTO = $this->userService->viewUser($id);

        return $this->inertia('user/form', [
            'user' => $userDTO->asArray()
        ]);
    }
}
