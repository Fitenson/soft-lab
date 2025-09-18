<?php

namespace backend\modules\project\domain\usecase;

use backend\modules\project\domain\repository\ProjectRepository;


class IndexProjectUseCase {
    private ProjectRepository $projectRepository;


    public function __construct(ProjectRepository $projectRepository)
    {
        $this->projectRepository = $projectRepository;
    }


    public function execute(array $params)
    {
        return $this->projectRepository->index($params);
    }
}
