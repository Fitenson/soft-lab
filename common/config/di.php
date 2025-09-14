<?php

use backend\modules\auth\di\AuthProvider;
use backend\modules\department\DI\DepartmentProvider;
use backend\modules\user\DI\UserProvider;


return [
    AuthProvider::class,
    UserProvider::class,
    DepartmentProvider::class
];
