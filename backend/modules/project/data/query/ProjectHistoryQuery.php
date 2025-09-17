<?php

namespace backend\modules\project\data\query;

/**
 * This is the ActiveQuery class for [[\backend\modules\project\data\models\ProjectHistory]].
 *
 * @see \backend\modules\project\data\models\ProjectHistory
 */
class ProjectHistoryQuery extends \backend\components\db\AppQuery
{
    /*public function active()
    {
        return $this->andWhere('[[status]]=1');
    }*/

    /**
     * {@inheritdoc}
     * @return \backend\modules\project\data\models\ProjectHistory[]|array
     */
    public function all($db = null)
    {
        return parent::all($db);
    }

    /**
     * {@inheritdoc}
     * @return \backend\modules\project\data\models\ProjectHistory|array|null
     */
    public function one($db = null)
    {
        return parent::one($db);
    }
}
