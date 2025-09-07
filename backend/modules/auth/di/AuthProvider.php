<?php

namespace backend\modules\auth\di;

use Yii;
use backend\components\provider\Provider;
use backend\modules\auth\domain\repository\AuthRepository;
use backend\modules\auth\data\repository\YiiAuthRepository;


class AuthProvider extends Provider
{
    public static function register(): void
    {
        Yii::$container->set(AuthRepository::class, YiiAuthRepository::class);
    }
}
