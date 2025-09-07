<?php

namespace backend\components\db;

use yii\db\ActiveRecord;


class AppModel extends ActiveRecord {
    public function beforeSave($insert)
    {
        foreach ($this->attributes() as $attribute) {
            $this->$attribute = trim($this->$attribute);
            if ($this->$attribute == "" || $this->$attribute == "null" || $this->$attribute == "undefined") {
                if ($attribute == "createdAt" || $attribute == "createdBy" || $attribute == "_version")
                    continue;
                $this->$attribute = NULL;
            }
        }

        return parent::beforeSave($insert);
    }
}
