<?php

namespace backend\modules\auth\di;

use DI\ContainerBuilder;
use backend\modules\auth\data\repository\YiiAuthRepository;
use backend\modules\auth\domain\repository\AuthRepository;


class AuthProvider
{
    public static function register(ContainerBuilder $builder): void
    {
        $builder->addDefinitions([
            AuthRepository::class => \DI\autowire(YiiAuthRepository::class),
        ]);
    }
}
