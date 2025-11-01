<?php

namespace backend\modules\project\domain\usecase;

use Yii;
use backend\modules\project\data\models\Project;


class IndexProjectUseCase {
    public function execute(array $params = [], $strategy = 'index')
    {
        $offset = !empty($params['offset']) ? $params['offset'] : 0;
        $sort = !empty($params['sort']) ? $params['sort'] : 'createdAt';
        $limit = !empty($params['limit']) ? $params['limit'] : 20;
        $valid = !empty($params['valid']) ? $params['valid'] : 1;
        $likeFilterFields = !empty($params['likeFilterFields']) ? $params['likeFilterFields'] : [];
        $compareFields = !empty($params['compareFields']) ? $params['compareFields'] : [];


        switch($strategy) {
            case 'list':
                $Projects = Project::find()->select([
                    'project.UUID',
                    'project.projectCode',
                    'project.projectName',
                    'project.description',
                ])->joinWith(['clientDatabases' => function($a) {
                    $a->select([
                        'clientDatabase.UUID',
                        'clientDatabase.project',
                        'clientDatabase.databaseName',
                        'clientDatabase.databaseSchema',
                    ]);
                }])
                ->asArray()
                ->all();
            
                $total = count($Projects);
            
                return [
                    'total' => (string)$total,
                    'rows' => $Projects
                ];
                break;
            case 'dropdownTable':
                $query = Project::find()->select([
                    'UUID',
                    'projectCode',
                    'projectName',
                    'description',
                ])
                ->where($valid)
                ->andWhere($compareFields)
                ->having($likeFilterFields);
                
                $total = $query->count();
                
                $Projects = $query
                ->orderBy($sort)
                ->offset($offset)
                ->limit($limit)
                ->asArray()
                ->all();
                
                
                return [
                    'total' => $total,
                    'rows' => $Projects
                ];
                break;

            case 'index':
                $query = Project::find()->selectIndex()
                ->where($valid)
                ->andWhere($compareFields)
                ->having($likeFilterFields);

                $total = $query->count();

                $Projects = $query
                ->orderBy($sort)
                ->offset($offset)
                ->limit($limit)
                ->asArray()
                ->all();


                return [
                    'total' => $total,
                    'rows' => $Projects
                ];
                break;

            default:
                Yii::$app->execution->throw('Strategy: ' . $strategy . ' not being implemented');
        }
    }
}
