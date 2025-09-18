<?php

namespace backend\modules\project\form;

use backend\components\form\Form;
use backend\modules\project\data\models\Project;


class ProjectForm extends Form {
    public ?string $UUID = null;
    public ?string $projectCode = null;
    public string $projectName;
    public ?string $description = null;
    public ?string $secondDescription = null;
    public ?string $moreDescription = null;
    public ?string $valid = null;
    

    public function rules()
    {
        return [
            [['projectCode', 'description', 'secondDescription', 'moreDescription'], 'default', 'value' => null],
            [['projectName'], 'required'],
            ['projectCode', 'unique',
                'targetClass' => Project::class, 
                'targetAttribute' => 'projectCode',
                'filter' => function($query) {
                    if ($this->UUID) {
                        $query->andWhere(['<>', 'UUID', $this->UUID]);
                    }
                }
            ],
            [['valid'], 'integer'],
            [['description'], 'string', 'max' => 500],
            [['secondDescription'], 'string', 'max' => 750],
            [['moreDescription'], 'string', 'max' => 1000],
        ];
    }
}
