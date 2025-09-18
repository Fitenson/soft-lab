<?php

namespace backend\modules\project\domain\usecase;

use backend\modules\project\domain\repository\ProjectRepository;


class RemoveProjectUseCase {
    private ProjectRepository $projectRepository;

    public function __construct(ProjectRepository $projectRepository)
    {
        $this->projectRepository = $projectRepository;
    }


    public function execute(array $data): array
    {
        return $this->projectRepository->remove($data);
    }
}
