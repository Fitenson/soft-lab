<?php

return [
    'auth' => [
        'class' => 'backend\modules\auth\AuthModule'
    ],
    'user' => [
        'class' => 'backend\modules\user\UserModule'
    ],
    'department' => [
        'class' => 'backend\modules\department\DepartmentModule'
    ],
    'project' => [
        'class' => 'backend\modules\project\ProjectModule'
    ],
    'client_database' => [
        'class' => 'backend\modules\client_database\ClientDatabaseModule'
    ],
    'api_test' => [
        'class' => 'backend\modules\api_test\ApiTestModule'
    ],
    'universal' => [
        'class' => 'backend\modules\universal\UniversalModule'
    ]
];
