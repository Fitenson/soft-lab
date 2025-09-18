<?php

namespace backend\modules\project\domain\usecase;

use backend\modules\project\domain\entity\ProjectEntity;
use backend\modules\project\domain\repository\ProjectRepository;


class CreateProjectUseCase {
    private ProjectRepository $projectRepository;

    public function __construct(ProjectRepository $projectRepository)
    {
        $this->projectRepository = $projectRepository;
    }


    public function execute(ProjectEntity $projectEntity): ProjectEntity
    {
        return $this->projectRepository->create($projectEntity);
    }
}
