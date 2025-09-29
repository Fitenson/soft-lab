<?php

namespace backend\modules\api_test\data\query;

/**
 * This is the ActiveQuery class for [[\backend\modules\api_test\data\models\ApiTestHasDataHistory]].
 *
 * @see \backend\modules\api_test\data\models\ApiTestHasDataHistory
 */
class ApiTestHasDataHistory extends \backend\components\db\AppQuery
{
    /*public function active()
    {
        return $this->andWhere('[[status]]=1');
    }*/

    /**
     * {@inheritdoc}
     * @return \backend\modules\api_test\data\models\ApiTestHasDataHistory[]|array
     */
    public function all($db = null)
    {
        return parent::all($db);
    }

    /**
     * {@inheritdoc}
     * @return \backend\modules\api_test\data\models\ApiTestHasDataHistory|array|null
     */
    public function one($db = null)
    {
        return parent::one($db);
    }
}
