<?php

namespace backend\modules\project\domain\usecase;

use Yii;
use Throwable;
use backend\modules\project\data\models\Project;
use backend\modules\project\data\dto\ProjectDTO;


class RemoveProjectUseCase {
    public string $actionUUID;


    public function execute(array $data): array
    {
        $_actionUUID = $this->actionUUID;
        $status = [
            'success' => [],
            'failed' => []
        ];

        $UUIDs = $data['UUIDs'];
        $Projects = Project::find()->where(['UUID' => $UUIDs])->all();

        foreach($Projects as $Project) {
            try {
                $transaction = Yii::$app->db->beginTransaction();
                $Project->_actionUUID = $_actionUUID;
                $Project->delete();
                $transaction->commit();

                $projectDTO = new ProjectDTO();
                $projectDTO->load($Project->getAttributes(), '');
                $status['success'][] = $projectDTO;
            } catch(Throwable $error) {
                $transaction->rollBack();

                $projectDTO = new ProjectDTO();
                $projectDTO->load($Project->getAttributes(), '');
                $status['failed'][] = $projectDTO;
                $status['failed']['message'] = $error->getMessage();
            }
        }

        return $status;
    }
}
