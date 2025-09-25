<?php

use backend\modules\auth\di\AuthProvider;
use backend\modules\department\DI\DepartmentProvider;
use backend\modules\project\di\ProjectProvider;
use backend\modules\user\DI\UserProvider;
use backend\modules\client_database\di\ClientDatabaseProvider;
use backend\modules\api_test\di\ApiTestProvider;


return [
    AuthProvider::class,
    UserProvider::class,
    DepartmentProvider::class,
    ProjectProvider::class,
    ClientDatabaseProvider::class,
    ApiTestProvider::class
];
