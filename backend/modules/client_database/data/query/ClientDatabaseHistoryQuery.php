<?php

namespace backend\modules\client_database\data\query;

/**
 * This is the ActiveQuery class for [[\backend\modules\client_database\data\models\ClientDatabaseHistory]].
 *
 * @see \backend\modules\client_database\data\models\ClientDatabaseHistory
 */
class ClientDatabaseHistoryQuery extends \backend\components\db\AppQuery
{
    /*public function active()
    {
        return $this->andWhere('[[status]]=1');
    }*/

    /**
     * {@inheritdoc}
     * @return \backend\modules\client_database\data\models\ClientDatabaseHistory[]|array
     */
    public function all($db = null)
    {
        return parent::all($db);
    }

    /**
     * {@inheritdoc}
     * @return \backend\modules\client_database\data\models\ClientDatabaseHistory|array|null
     */
    public function one($db = null)
    {
        return parent::one($db);
    }
}
