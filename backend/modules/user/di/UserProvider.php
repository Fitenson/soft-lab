<?php

namespace backend\modules\user\DI;

use Yii;
use backend\components\provider\Provider;
use backend\modules\user\domain\repository\UserRepository;
use backend\modules\user\data\repository\YiiUserRepository;


class UserProvider extends Provider {
    public static function register(): void
    {
        Yii::$container->set(UserRepository::class, YiiUserRepository::class);
    }
}
