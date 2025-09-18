<?php

namespace backend\modules\project\data\repository;

use Yii;
use Throwable;
use backend\components\repository\BaseRepository;
use backend\modules\project\data\models\Project;
use backend\modules\project\data\dto\ProjectDTO;
use backend\modules\project\domain\entity\ProjectEntity;
use backend\modules\project\domain\repository\ProjectRepository;


class YiiProjectRepository extends BaseRepository implements ProjectRepository {
    public function index(array $params): array
    {
        $params = $this->getParams($params);
        $offset = $params['offset'];
        $sort = $params['sort'];
        $limit = $params['limit'];
        $valid = $params['valid'];
        $likeFilterFields = $params['likeFilterFields'];
        $compareFields = $params['compareFields'];

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
    }


    public function create(ProjectEntity $projectEntity): ProjectEntity
    {
        $_actionUUID = $this->getActionUUID();

        $projectDTO = $projectEntity->asDTO();
        $Project = new Project();
        $Project->load($projectDTO->getAttributes(), '');

        if(!$Project->save(false)) {
            Yii::$app->exception->throw($Project->getErrors(), 500);
        }

        return new ProjectEntity($Project->getAttributes());
    }


    public function update(ProjectEntity $projectEntity): ProjectEntity
    {
        $_actionUUID = $this->getActionUUID();
        $projectDTO = $projectEntity->asDTO();
        $Project = Project::findOne($projectDTO->UUID);

        $Project->load($projectDTO->getAttributes(), '');
        $Project->_actionUUID = $_actionUUID;

        if(!$Project->save(false)) {
            Yii::$app->exception->throw('Failed to save Project data', 500);
        }

        return new ProjectEntity($Project->getAttributes());        
    }

    public function view(string $id): ProjectEntity
    {
        $Project = Project::find()
        ->selectIndex()
        ->where(['UUID' => $id])
        ->asArray()
        ->one();

        return new ProjectEntity($Project);        
    }

    public function remove(array $data): array
    {
        $_actionUUID = $this->getActionUUID();
        $status = [
            'success' => [],
            'failed' => []
        ];

        $UUIDs = $data['UUIDs'];
        $Projects = Project::find()->where(['UUID' => $UUIDs])->all();

        foreach($Projects as $Project) {
            try {
                $transaction = Yii::$app->db->beginTransaction();
                $Project->_actionUUID = $_actionUUID;
                $Project->delete();
                $transaction->commit();

                $projectDTO = new ProjectDTO();
                $projectDTO->load($Project->getAttributes(), '');
                $status['success'][] = $projectDTO;
            } catch(Throwable $error) {
                $transaction->rollBack();

                $projectDTO = new ProjectDTO();
                $projectDTO->load($Project->getAttributes(), '');
                $status['failed'][] = $projectDTO;
                $status['failed']['message'] = $error->getMessage();
            }
        }

        return $status;        
    }
}
