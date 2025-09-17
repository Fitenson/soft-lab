<?php

namespace backend\modules\project\data\query;

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
}
