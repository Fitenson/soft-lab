<?php

namespace backend\modules\universal\di;

use Yii;
use backend\components\provider\Provider;
use backend\modules\universal\data\repository\YiiUniversalRepository;
use backend\modules\universal\domain\repository\UniversalRepository;


class UniversalProvider extends Provider {
    public static function register(): void
    {
        Yii::$container->set(UniversalRepository::class, YiiUniversalRepository::class);
    }
}
