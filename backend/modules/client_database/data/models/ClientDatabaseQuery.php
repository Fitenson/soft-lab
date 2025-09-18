<?php

namespace backend\modules\client_database\data\models;

/**
 * This is the ActiveQuery class for [[ClientDatabase]].
 *
 * @see ClientDatabase
 */
class ClientDatabaseQuery extends \backend\components\db\AppQuery
{
    /*public function active()
    {
        return $this->andWhere('[[status]]=1');
    }*/

    /**
     * {@inheritdoc}
     * @return ClientDatabase[]|array
     */
    public function all($db = null)
    {
        return parent::all($db);
    }

    /**
     * {@inheritdoc}
     * @return ClientDatabase|array|null
     */
    public function one($db = null)
    {
        return parent::one($db);
    }
}
