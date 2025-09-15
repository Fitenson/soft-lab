<?php

namespace backend\components\form;

use ReflectionClass;
use yii\base\Model;


abstract class Form extends Model {
    public function attributes()
    {
        $reflect = new \ReflectionClass($this);
        $props = $reflect->getProperties(\ReflectionProperty::IS_PUBLIC);

        return array_map(fn($p) => $p->getName(), $props);
    }


    public function beforeValidate()
    {
        if(!parent::beforeValidate()) {
            return false;
        }

        foreach($this->attributes as $name => $value) {
            if(is_string($value) && $this->hasSqlInjection($value)) {
                $this->addError($name, 'Invalid characters detected');
            }
        }

        return true;
    }


    /**
     * Example: prevent suspicious SQL input globally.
     */
    protected function hasSqlInjection(string $value): bool
    {
        return (bool) preg_match('/(union|select|insert|drop|update|delete|;|--)/i', $value);
    }

    /**
     * Example: validate uploaded file type/size.
     */
    public function validateSafeFile($attribute, $params)
    {
        $file = $this->$attribute;
        if ($file && !$file->getHasError()) {
            $allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
            if (!in_array($file->type, $allowedTypes, true)) {
                $this->addError($attribute, 'Invalid file type.');
            }
            if ($file->size > 50 * 1024 * 1024) { // 50MB limit
                $this->addError($attribute, 'File too large.');
            }
        }
    }


    public function asArray(): array
    {
        return $this->getAttributes();
    }
}
