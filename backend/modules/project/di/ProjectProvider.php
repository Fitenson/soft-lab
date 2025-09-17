<?php

namespace backend\modules\project\di;

use Yii;
use backend\components\provider\Provider;
use backend\modules\project\domain\repository\ProjectRepository;
use backend\modules\project\data\repository\YiiProjectRepository;


class ProjectProvider extends Provider {
    public static function register(): void
    {
        Yii::$container->set(ProjectRepository::class, YiiProjectRepository::class);
    }
}
