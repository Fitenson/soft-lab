<?php

namespace backend\components\entity;

use Yii;


abstract class Entity {
    protected string $DTOClassName;


    public function __construct(?array $data = [])
    {
        foreach($data as $key => $value) {
            if(property_exists($this, $key)) {
                $setter = 'set' . ucfirst($key);

                if(method_exists($this, $setter)) {
                    $this->$setter($value);
                }
            }
        }
    }


    abstract public function asArray(): array;


    public function asDTO()
    {
        $DTOClassName = $this->DTOClassName;
        
        if(!class_exists($DTOClassName)) {
            Yii::$app->exception->throw('This class name does not exists' . $DTOClassName, 500);
        }

        $DTO = new $DTOClassName();
        $DTO->load($this->asArray(), '');
        return $DTO;
    }
}
