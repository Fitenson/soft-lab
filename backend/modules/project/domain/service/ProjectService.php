<?php

namespace backend\modules\project\domain\service;

use Yii;
use backend\components\exception\ApiException;
use backend\components\service\BaseService;
use backend\modules\project\data\dto\ProjectDTO;
use backend\modules\project\data\models\Project;
use backend\modules\project\domain\entity\ProjectEntity;
use backend\modules\project\domain\usecase\CreateProjectUseCase;
use backend\modules\project\domain\usecase\IndexProjectUseCase;
use backend\modules\project\domain\usecase\UpdateProjectUseCase;
use backend\modules\project\domain\usecase\RemoveProjectUseCase;


class ProjectService extends BaseService {
    private IndexProjectUseCase $indexProjectUseCase;
    private CreateProjectUseCase $createProjectUseCase;
    private UpdateProjectUseCase $updateProjectUseCase;
    private RemoveProjectUseCase $removeProjectUseCase;


    public function __construct(
        IndexProjectUseCase $indexProjectUseCase,
        CreateProjectUseCase $createProjectUseCase,
        UpdateProjectUseCase $updateProjectUseCase,
        RemoveProjectUseCase $removeProjectUseCase
    )
    {
        $this->indexProjectUseCase = $indexProjectUseCase;
        $this->createProjectUseCase = $createProjectUseCase;
        $this->updateProjectUseCase = $updateProjectUseCase;
        $this->removeProjectUseCase = $removeProjectUseCase;
    }


    public function index(array $params) {
        $params = $this->getParams($params);

        return $this->indexProjectUseCase->execute($params);
    }


    public function createProject(ProjectEntity $projectEntity): ProjectDTO
    {
        try {
            $transaction = Yii::$app->db->beginTransaction();
            $this->createProjectUseCase->actionUUID = $this->getActionUUID();
            $projectEntity = $this->createProjectUseCase->execute($projectEntity);
            $transaction->commit();
            return $projectEntity->asDTO();
        } catch(ApiException $error) {
            $transaction->rollBack();
            throw $error;
            return new ProjectDTO();
        }
    }


    public function updateProject(ProjectEntity $projectEntity): ProjectDTO
    {
        try {
            $transaction = Yii::$app->db->beginTransaction();
            $this->updateProjectUseCase->actionUUID = $this->getActionUUID();
            $projectEntity = $this->updateProjectUseCase->execute($projectEntity);
            $transaction->commit();
            return $projectEntity->asDTO();
        } catch(ApiException $error) {
            $transaction->rollBack();
            throw $error;
            return new ProjectDTO();
        }
    }

    
    public function viewProject(string $id): ProjectDTO
    {
        $Project = Project::find()
        ->selectIndex()
        ->where(['UUID' => $id])
        ->asArray()
        ->one();

        $projectEntity = new ProjectEntity($Project);

        return $projectEntity->asDTO();
    }


    public function removeProject(array $data): array
    {
        $this->removeProjectUseCase->actionUUID = $this->getActionUUID();
        return $this->removeProjectUseCase->execute($data);
    }
}
