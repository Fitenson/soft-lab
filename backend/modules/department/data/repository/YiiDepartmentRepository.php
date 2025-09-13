<?php

namespace backend\modules\department\data\repository;

use Yii;
use backend\components\repository\BaseRepository;
use backend\modules\department\data\models\Department;
use backend\modules\department\domain\entity\DepartmentEntity;
use backend\modules\department\domain\repository\DepartmentRepository;


class YiiDepartmentRepository extends BaseRepository implements DepartmentRepository {
    private string $_actionUUID;

    public function setActionUUID(): void
    {
        $this->_actionUUID = Yii::$app->db->createCommand('select UUID()')->queryScalar();
    }

    public function index(array $params)
    {
        $params = $this->getParams($params);
        $offset = $params['offset'];
        $sort = $params['sort'];
        $limit = $params['limit'];
        $valid = $params['valid'];
        $likeFilterFields = $params['likeFilterFields'];
        $compareFields = $params['compareFields'];

        $query = Department::find()->selectIndex()
        ->where($valid)
        ->andWhere($compareFields)
        ->having($likeFilterFields);

        $total = $query->count();

        $Departments = $query
        ->orderBy($sort)
        ->offset($offset)
        ->limit($limit)
        ->asArray()
        ->all();

        
        return [
            'total' => $total,
            'rows' => $Departments
        ];
    }


    public function create(DepartmentEntity $departmentEntity): DepartmentEntity
    {
        $actionUUID = $this->_actionUUID;

        $departmentData = $departmentEntity->asArray();
        $Department = new Department();
        $Department->load($departmentData, '');
        $Department->_actionUUID = $actionUUID;

        if(!$Department->save(false)) {
            Yii::$app->exception->throw('Failed to save Department data', 500);
        }
        
        return new DepartmentEntity($Department->attributes());
    }


    public function update(DepartmentEntity $departmentEntity): DepartmentEntity
    {
        $actionUUID = $this->_actionUUID;
        $departmentData = $departmentEntity->asArray();
        $Department = Department::findOne($departmentData['UUID']);

        $Department->load($departmentData, '');
        $Department->_actionUUID = $actionUUID;

        if(!$Department->save(false)) {
            Yii::$app->exception->throw('Failed to save Department data', 500);
        }

        return new DepartmentEntity($Department->attributes());
    }


    public function view(string $id): DepartmentEntity
    {
        $Department = Department::find()
        ->selectIndex()
        ->where(['UUID' => $id])
        ->asArray()
        ->one();

        return new DepartmentEntity($Department);
    }


    public function remove(array $data)
    {
        
    }
}
