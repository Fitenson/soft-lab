<?php

namespace backend\modules\project\domain\usecase;

use Yii;
use Throwable;
use backend\modules\project\domain\entity\ProjectEntity;
use backend\modules\project\domain\repository\ProjectRepository;


class UpdateProjectUseCase {
    private ProjectRepository $projectRepository;

    public function __construct(ProjectRepository $projectRepository)
    {
        $this->projectRepository = $projectRepository;
    }


    public function execute(ProjectEntity $ProjectEntity): ProjectEntity
    {
        return $this->projectRepository->update($ProjectEntity);
    }
}
