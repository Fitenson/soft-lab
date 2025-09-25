<?php

namespace backend\modules\project\domain\usecase;

use Yii;
use backend\modules\project\domain\repository\ProjectRepository;


class IndexProjectUseCase {
    private ProjectRepository $projectRepository;


    public function __construct(ProjectRepository $projectRepository)
    {
        $this->projectRepository = $projectRepository;
    }


    public function execute(array $params = [], $strategy = 'index')
    {
        switch($strategy) {
            case 'list':
                return $this->projectRepository->listProjects();
                break;
            case 'dropdownTable':
                return $this->dropdownTable($params);
                break;
            case 'index':
                return $this->index($params);
            default:
                Yii::$app->exception->throw('Unknown strategy: ' . $strategy, 422);
        }
    }


    private function index(array $params) {
        return $this->projectRepository->index($params);
    }


    private function dropdownTable(array $params) {
        return $this->projectRepository->dropdownTable($params);
    }
}
