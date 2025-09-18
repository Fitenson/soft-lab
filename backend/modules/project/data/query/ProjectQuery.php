<?php

namespace backend\modules\project\data\query;

use backend\modules\user\data\models\User;

/**
 * This is the ActiveQuery class for [[\backend\modules\project\data\models\Project]].
 *
 * @see \backend\modules\project\data\models\Project
 */
class ProjectQuery extends \backend\components\db\AppQuery
{
    /*public function active()
    {
        return $this->andWhere('[[status]]=1');
    }*/

    /**
     * {@inheritdoc}
     * @return \backend\modules\project\data\models\Project[]|array
     */
    public function all($db = null)
    {
        return parent::all($db);
    }

    /**
     * {@inheritdoc}
     * @return \backend\modules\project\data\models\Project|array|null
     */
    public function one($db = null)
    {
        return parent::one($db);
    }


    public function selectIndex() {
        return $this->select([
            'UUID',
            'projectCode',
            'projectName',
            'description',
            'secondDescription',
            'moreDescription',
            'createdAt',
            'updatedAt',
            'createdAtFormat' => 'FROM_UNIXTIME(createdAt, "%Y-%m-%d %H:%i:%s")',
            'updatedAtFormat' => 'FROM_UNIXTIME(updatedAt, "%Y-%m-%d %H:%i:%s")',
            'createdByName' => User::find()->select(['fullName'])->where('user.UUID = project.createdBy'),
            'updatedByName' => User::find()->select(['fullName'])->where('user.UUID = project.updatedBy'),
        ]);
    }
}
