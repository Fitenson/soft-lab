<?php

return array_merge(
    require __DIR__ . './auth/auth_route.php',
    require __DIR__ . './organization/user_route.php',
    require __DIR__ . './project_management/project_route.php',
    require __DIR__ . './organization/department_route.php',
    require __DIR__ . './backend/client_database_route.php',
    require __DIR__ . './universal.php'
);
