<?php

namespace backend\modules\client_database\di;

use Yii;
use backend\components\provider\Provider;
use backend\modules\client_database\data\repository\YiiClientDatabaseRepository;
use backend\modules\client_database\domain\repository\ClientDatabaseRepository;


class ClientDatabaseProvider extends Provider {
    public static function register(): void
    {
        Yii::$container->set(ClientDatabaseRepository::class, YiiClientDatabaseRepository::class);
    }
}
