<?php

namespace common\providers;

use DI\ContainerBuilder;
use backend\modules\auth\di\AuthProvider;


class AppServiceProvider {
    public static function register(ContainerBuilder $builder): void
    {
        AuthProvider::register($builder);
    }
}
