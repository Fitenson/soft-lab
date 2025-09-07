<?php

namespace backend\components\provider;

use DI\ContainerBuilder;


abstract class Provider
{
    /**
     * Each provider must implement register function to register their instances
     */
    abstract public static function register(): void;
}
