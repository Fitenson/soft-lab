<?php

namespace backend\modules\department\form;

use backend\components\form\Form;
use backend\modules\user\data\models\User;


class DepartmentForm extends Form {
    public ?string $UUID = null;
    public ?string $departmentID;
    public ?string $departmentName;
    public ?string $head;
    public ?string $headDepartmentName;
    public ?string $description;
    

    public function rules()
    {
        return [
            [['head', 'description', 'departmentID', 'valid'], 'default', 'value' => null],
            [['UUID', 'departmentName'], 'required'],
            [['valid', '_version'], 'integer'],
            [['departmentID', 'departmentName'], 'string', 'max' => 100],
            [['description'], 'string', 'max' => 1000],
            [['head'], 'exist', 'skipOnError' => true, 'targetClass' => User::class, 'targetAttribute' => ['head' => 'UUID']],
        ];
    }


    public function asArray()
    {
        return $this->attributes();
    }
}
