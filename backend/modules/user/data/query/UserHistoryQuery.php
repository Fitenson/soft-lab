<?php

namespace backend\modules\user\data\query;

/**
 * This is the ActiveQuery class for [[\backend\modules\user\data\models\UserHistory]].
 *
 * @see \backend\modules\user\data\models\UserHistory
 */
class UserHistoryQuery extends \backend\components\db\AppQuery
{
    /*public function active()
    {
        return $this->andWhere('[[status]]=1');
    }*/

    /**
     * {@inheritdoc}
     * @return \backend\modules\user\data\models\UserHistory[]|array
     */
    public function all($db = null)
    {
        return parent::all($db);
    }

    /**
     * {@inheritdoc}
     * @return \backend\modules\user\data\models\UserHistory|array|null
     */
    public function one($db = null)
    {
        return parent::one($db);
    }
}
