<?php

namespace backend\modules\project\domain\usecase;

use backend\modules\project\data\dto\ProjectDTO;
use backend\modules\project\domain\repository\ProjectRepository;


class ViewProjectUseCase {
    private ProjectRepository $projectRepository;


    public function __construct(ProjectRepository $projectRepository)
    {
        $this->projectRepository = $projectRepository;
    }


    public function execute(string $id): ProjectDTO
    {
        $ProjectEntity = $this->projectRepository->view($id);
        return $ProjectEntity->asDTO();
    }
}
