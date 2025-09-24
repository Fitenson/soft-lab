<?php

return array_merge(
    require __DIR__ . './auth/auth_route.php',
    require __DIR__ . './backend/client_database_route.php',
    require __DIR__ . './backend/api_test_route.php',
);
