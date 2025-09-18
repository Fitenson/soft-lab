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


    public static function generateAutoNumber($className, $columnName, $prefix)
    {
        $model = new $className;

        $nextNumber = 1;
        $newRunningNumber = (int) $nextNumber - 1;

        $fullYear = date("Y");
        // $year = substr($fullYear, -2);
        $month = date("m");
        // $century = floor($fullYear / 100) + 1;
        $day = date("d");

        do {
            $newRunningNumber += 1;

            if (!empty($prefix)) {
                // Step 1: Replace yyyy, mm in the prefix
                $newAutoNumber = $prefix;
                // $newAutoNumber = str_replace("cc", $century, $newAutoNumber);
                $newAutoNumber = str_replace("yyyy", $fullYear, $newAutoNumber);
                $newAutoNumber = str_replace("mm", $month, $newAutoNumber);
                $newAutoNumber = str_replace("dd", $day, $newAutoNumber);

                // Step 2: Replace the "?" block with the padded running number
                if (preg_match("/\?+/", $newAutoNumber, $matches)) {
                    $padLength = strlen($matches[0]);
                    $num_padded = sprintf("%0" . $padLength . "d", $newRunningNumber);
                    $newAutoNumber = preg_replace("/\?+/", $num_padded, $newAutoNumber, 1);
                }
            } else {
                $newAutoNumber = $newRunningNumber;
            }

            // Step 3: Check if this number already exists
            $model = new $className;
            $query = $model::find()->where([$columnName => $newAutoNumber]);

            $ExistingData = $query->exists();
        } while ($ExistingData);

        return $newAutoNumber;
    }
}
