<?php

namespace common\providers;

use backend\components\provider\Provider;
use DI\ContainerBuilder;
use backend\modules\auth\di\AuthProvider;


class AppServiceProvider extends Provider {
    public static function definitions(ContainerBuilder $builder): array
    {
        return self::merge([
            AuthProvider::class
        ]);
    }
}
