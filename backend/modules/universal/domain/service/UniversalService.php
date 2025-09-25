<?php

namespace backend\modules\universal\domain\service;

use backend\modules\project\domain\usecase\IndexProjectUseCase;


class UniversalService {
    private IndexProjectUseCase $indexProjectUseCase;

    public function __construct(IndexProjectUseCase $indexProjectUseCase)
    {
        $this->indexProjectUseCase = $indexProjectUseCase;
    }


    public function dropdownTable(array $params, array $tables) {
        return $this->indexProjectUseCase->execute($params, 'dropdownTable');
    }
}
