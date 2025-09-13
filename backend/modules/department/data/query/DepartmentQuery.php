<?php

namespace backend\modules\department\data\query;

use backend\modules\user\data\models\User;

/**
 * This is the ActiveQuery class for [[\backend\modules\department\data\models\Department]].
 *
 * @see \backend\modules\department\data\models\Department
 */
class DepartmentQuery extends \backend\components\db\AppQuery
{
    /*public function active()
    {
        return $this->andWhere('[[status]]=1');
    }*/

    /**
     * {@inheritdoc}
     * @return \backend\modules\department\data\models\Department[]|array
     */
    public function all($db = null)
    {
        return parent::all($db);
    }

    /**
     * {@inheritdoc}
     * @return \backend\modules\department\data\models\Department|array|null
     */
    public function one($db = null)
    {
        return parent::one($db);
    }


    public function selectIndex(): self
    {
        return $this->select([
            'UUID',
            'departmentID',
            'departmentName',
            'headDepartmentName' => User::find()->select(['fullName'])->where('user.UUID = department.head'),
            'description',
            'createdAtFormat' => 'FROM_UNIXTIME(createdAt, "%Y-%m-%d %H:%i:%s")',
            'updatedAtFormat' => 'FROM_UNIXTIME(updatedAt, "%Y-%m-%d %H:%i:%s")',
            'createdByName' => User::find()->select(['fullName'])->where('user.UUID = department.createdBy'),
            'updatedByName' => User::find()->select(['fullName'])->where('user.UUID = department.updatedBy'),
        ]);
    }
}
