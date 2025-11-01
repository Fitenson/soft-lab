<?php

namespace backend\modules\project\domain\usecase;

use Yii;
use Throwable;
use backend\modules\project\data\models\Project;
use backend\modules\project\domain\entity\ProjectEntity;


class UpdateProjectUseCase {
    public string $actionUUID;


    public function execute(ProjectEntity $projectEntity): ProjectEntity
    {
        $_actionUUID = $this->actionUUID;

        $projectDTO = $projectEntity->asDTO();
        $Project = Project::findOne($projectDTO->UUID);

        $Project->load($projectDTO->getAttributes(), '');
        $Project->_actionUUID = $_actionUUID;

        if(!$Project->save(false)) {
            Yii::$app->exception->throw($Project->getErrors(), 500);
        }

        return new ProjectEntity($Project->getAttributes());
    }
}
