<?php

namespace backend\modules\department\DI;

use Yii;
use backend\components\provider\Provider;
use backend\modules\department\domain\repository\DepartmentRepository;
use backend\modules\department\data\repository\YiiDepartmentRepository;


class DepartmentProvider extends Provider {
    public static function register(): void
    {
        Yii::$container->set(DepartmentRepository::class, YiiDepartmentRepository::class);
    }
}
