<?php

namespace backend\modules\api_test\di;

use Yii;
use backend\components\provider\Provider;
use backend\modules\api_test\data\repository\YiiApiTestRepository;
use backend\modules\api_test\domain\repository\ApiTestRepository;


class ApiTestProvider extends Provider {
    public static function register(): void
    {
        Yii::$container->set(ApiTestRepository::class, YiiApiTestRepository::class);
    }
}
