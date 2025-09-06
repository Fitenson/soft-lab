<?php

use DI\ContainerBuilder;
use common\providers\AppServiceProvider;

$builder = new ContainerBuilder();

return AppServiceProvider::definitions($builder);
