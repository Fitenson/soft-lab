<?php

namespace common\components\inertia;

use Yii;
use tebe\inertia\web\Controller;

class InertiaController extends Controller {
    public $layout = false;

    public function inertia($component, $params = [])
    {
        $params['action'] = Yii::$app->controller->action->id;
        return parent::inertia($component, $params);
    }
}
