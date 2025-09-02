<?php

namespace backend\components\request;

use yii\web\Request;


abstract class FormRequest extends Request {
    public ?string $modelClass;
    public ?string $name = '';
    public ?array $attributes = [];


    public function __construct()
    {
        if(empty($this->modelClass)) {
            $model = new $this->modelClass;

            
        }
    }


    public function validate() {
        if(!empty($this->modelClass) && class_exists($this->modelClass)) {
            $model = new $this->modelClass;
        }
    }
}
