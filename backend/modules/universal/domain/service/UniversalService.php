<?php

namespace backend\modules\universal\domain\service;

use Yii;
use backend\modules\project\domain\usecase\IndexProjectUseCase;


class UniversalService {
    private array $useCases;


    public function __construct(
        IndexProjectUseCase $indexProjectUseCase
    ) {
        $this->useCases = [
            'project' => $indexProjectUseCase
        ];
    }


    public function dropdownTable(array $params, array $tables) {
        $data = [];
        $useCases = $this->useCases;

        foreach($tables as $table) {
            if(!isset($useCases[$table])) {
                Yii::$app->exception->throw('This use case does not exist' . $table, 422);
            }

            $data[$table] = $useCases[$table]->execute($params, 'dropdownTable');
        }

        return $data;
    }
}
