<?php

namespace backend\components\provider;

use DI\ContainerBuilder;


abstract class Provider
{
    /**
     * Each provider must return an array of definitions.
     */
    abstract public static function definitions(ContainerBuilder $builder): array;

    /**
     * Helper to merge multiple providers into one definition array.
     */
    public static function merge(array $providers): array
    {
        $definitions = [];

        foreach ($providers as $provider) {
            if (is_subclass_of($provider, Provider::class)) {
                $definitions = array_merge(
                    $definitions,
                    $provider::definitions()
                );
            }
        }

        return $definitions;
    }
}
