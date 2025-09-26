<?php

namespace backend\components\form;

use yii\base\Model;


class AppDTO extends Model {
    protected function snakeToCamelCase(string $name) {
        return lcfirst(str_replace(' ', '', ucwords(str_replace('_', ' ', $name))));
    }
}
