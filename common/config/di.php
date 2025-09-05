<?php

use common\providers\AppServiceProvider;
use Di\ContainerBuilder;

$builder = new ContainerBuilder();

AppServiceProvider::register($builder);

return $builder->build();
