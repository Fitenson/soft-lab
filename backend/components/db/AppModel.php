<?php

namespace backend\components\db;

use yii\db\ActiveRecord;


class AppModel extends ActiveRecord {
    public function beforeSave($insert)
    {
        foreach ($this->attributes() as $attribute) {
            if (is_string($this->$attribute)) {
                $this->$attribute = trim($this->$attribute);
            }

            if ($this->$attribute === "" || $this->$attribute === "null" || $this->$attribute === "undefined") {
                if ($attribute == "createdAt" || $attribute == "_version") {
                    continue;
                }
                $this->$attribute = null;
            }
        }

        return parent::beforeSave($insert);
    }


    public function saveQuietly($runValidation = true, $attributeNames = null)
    {
        if ($runValidation && !$this->validate($attributeNames)) {
            return false;
        }
    
        $attributes = $attributeNames ? array_intersect_key($this->attributes, array_flip($attributeNames)) : $this->attributes;
    
        if ($this->getIsNewRecord()) {
            return static::getDb()->createCommand()
            ->insert(static::tableName(), $attributes)
            ->execute();
        } else {
            return static::getDb()->createCommand()
            ->update(static::tableName(), $attributes, $this->getPrimaryKey(true))
            ->execute();;
        }
    }
}
