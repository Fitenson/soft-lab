<?php

namespace backend\providers;

use backend\components\provider\Provider;


class AppServiceProvider extends Provider {
    public static function register(): void
    {
        $providers = require __DIR__ . './di.php';

        foreach($providers as $provider) {
            $provider::register();
        }
    }
}
