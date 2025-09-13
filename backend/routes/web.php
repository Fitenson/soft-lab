<?php

return array_merge(
    require __DIR__ . './auth/auth_route.php',
    require __DIR__ . './user/user_route.php',
    require __DIR__ . './department/department_route.php'
);
