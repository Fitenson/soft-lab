<?php

namespace backend\modules\project\domain\service;

use Yii;
use backend\components\exception\ApiException;

use backend\modules\project\data\dto\ProjectDTO;
use backend\modules\project\domain\entity\ProjectEntity;
use backend\modules\project\domain\usecase\CreateProjectUseCase;
use backend\modules\project\domain\usecase\IndexProjectUseCase;
use backend\modules\project\domain\usecase\UpdateProjectUseCase;
use backend\modules\project\domain\usecase\RemoveProjectUseCase;
use backend\modules\project\domain\usecase\ViewProjectUseCase;


class ProjectService {
    private IndexProjectUseCase $indexProjectUseCase;
    private CreateProjectUseCase $createProjectUseCase;
    private UpdateProjectUseCase $updateProjectUseCase;
    private ViewProjectUseCase $viewProjectUseCase;
    private RemoveProjectUseCase $removeProjectUseCase;


    public function __construct(
        IndexProjectUseCase $indexProjectUseCase,
        CreateProjectUseCase $createProjectUseCase,
        UpdateProjectUseCase $updateProjectUseCase,
        ViewProjectUseCase $viewProjectUseCase,
        RemoveProjectUseCase $removeProjectUseCase
    )
    {
        $this->indexProjectUseCase = $indexProjectUseCase;
        $this->createProjectUseCase = $createProjectUseCase;
        $this->updateProjectUseCase = $updateProjectUseCase;
        $this->viewProjectUseCase = $viewProjectUseCase;
        $this->removeProjectUseCase = $removeProjectUseCase;
    }


    public function index(array $params) {
        return $this->indexProjectUseCase->execute($params);
    }


    public function createProject(ProjectEntity $projectEntity): ProjectDTO
    {
        try {
            $transaction = Yii::$app->db->beginTransaction();
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
        return $this->viewProjectUseCase->execute($id);
    }


    public function removeProject(array $data): array
    {
        return $this->removeProjectUseCase->execute($data);
    }
}
