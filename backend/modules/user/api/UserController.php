<?php

namespace backend\modules\user\api;

use Yii;
use backend\controllers\RestController;
use backend\modules\user\domain\entity\UserEntity;
use backend\modules\user\domain\service\UserService;
use backend\modules\user\form\UserForm;


class UserController extends RestController {
    private UserService $userService;

    public function init()
    {
        parent::init();
        $this->userService = Yii::$container->get(UserService::class);
    }


    public function actionIndex() {
        $params = Yii::$app->request->post()['param'];

        return $this->userService->index($params);
    }


    public function actionCreate() {
        $data = Yii::$app->request->post();

        $userForm = new UserForm();
        $userForm->load($data['user'], '');

        if(!$userForm->validate()) {
            Yii::$app->exception->throw($userForm->getErrors(), 422);
        }

        $userData = $userForm->getAttributes();
        $userDTO = $this->userService->createUser(new UserEntity($userData));

        return [
            'user' => $userDTO->asArray()
        ];
    }


    public function actionUpdate($id) {
        $data = Yii::$app->request->post();

        $userForm = new UserForm();
        $userForm->load($data['user'], '');
        $userForm->UUID = $id;

        if(!$userForm->validate()) {
            Yii::$app->exception->throw($userForm->getErrors(), 422);
        }

        $userData = $userForm->getAttributes();
        $userDTO = $this->userService->updateUser(new UserEntity($userData));

        return [
            'user' => $userDTO->asArray()
        ];
    }
}
