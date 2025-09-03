<?php
return [
    'aliases' => [
        '@bower' => '@vendor/bower-asset',
        '@npm'   => '@vendor/npm-asset',
    ],
    'vendorPath' => dirname(dirname(__DIR__)) . '/vendor',
    'components' => [
        'inertia' => [
            'class' => tebe\inertia\Inertia::class,
            'rootElementId' => 'app',
            'view' => '@frontend/views/layouts/inertia',
        ],
        'request' => [
            'class' => 'tebe\inertia\web\Request',             
            'cookieValidationKey' => 'soft-lab'
        ] ,
        'cache' => [
            'class' => \yii\caching\FileCache::class,
        ],
        'router' => [
            'class' => common\routing\Route::class
        ]
    ],
];
