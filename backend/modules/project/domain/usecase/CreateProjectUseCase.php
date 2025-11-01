<?php

namespace backend\modules\project\domain\usecase;

use Yii;
use backend\modules\project\data\models\Project;
use backend\modules\project\domain\entity\ProjectEntity;


class CreateProjectUseCase {
    public string $actionUUID;


    public function execute(ProjectEntity $projectEntity): ProjectEntity
    {
        $_actionUUID = $this->actionUUID;

        $projectDTO = $projectEntity->asDTO();
        $Project = new Project();
        $Project->load($projectDTO->getAttributes(), '');
        $Project->_actionUUID = $_actionUUID;

        if(!$Project->save(false)) {
            Yii::$app->exception->throw($Project->getErrors(), 500);
        }

        return new ProjectEntity($Project->getAttributes());
    }
}
