<?php

namespace backend\components\entity;

use ReflectionClass;


abstract class Entity {
    public function __construct(?array $data = [])
    {
        foreach($data as $key => $value) {
            if(property_exists($this, $key)) {
                $this->$key = $value;
            }
        }
    }


    public function toArray(): array
    {
        $data = [];
        $reflection = new ReflectionClass($this);

        foreach($reflection->getProperties() as $property) {
            $property->setAccessible(true);
            $data[$property->getName()] = $property->getValue($this);
        }

        return $data;
    }
}
