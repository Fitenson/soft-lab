<?php

namespace backend\modules\auth;

use yii\base\Module;


class AuthModule extends Module {
    public $controllerNamespace = 'backend\modules\auth\api';

    public function init()
    {
        parent::init();
    }
}
