<?php

namespace backend\modules\api_test\domain\service;

use backend\modules\project\domain\usecase\IndexProjectUseCase;

class ApiTestService {
    private IndexProjectUseCase $indexProjectUseCase;

    public function __construct(
        IndexProjectUseCase $indexProjectUseCase
    )
    {
        $this->indexProjectUseCase = $indexProjectUseCase;    
    }

    public function listProjects()
    {
        return $this->indexProjectUseCase->execute([], 'list');
    }
}
