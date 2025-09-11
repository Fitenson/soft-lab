<?php

namespace backend\modules\user\data\query;

use backend\modules\user\data\models\User;
use Yii;

/**
 * This is the ActiveQuery class for [[User]].
 *
 * @see User
 */
class UserQuery extends \backend\components\db\AppQuery
{
    /*public function active()
    {
        return $this->andWhere('[[status]]=1');
    }*/

    /**
     * {@inheritdoc}
     * @return User[]|array
     */
    public function all($db = null)
    {
        return parent::all($db);
    }

    /**
     * {@inheritdoc}
     * @return User|array|null
     */
    public function one($db = null)
    {
        return parent::one($db);
    }

    public function selectIndex(): self
    {
        return $this->select([
            'UUID',
            'username',
            'fullName',
            'gender',
            'title',
            'phoneNo',
            'description',
            'address',
            'createdAt',
            'updatedAt',
            'createdAtFormat' => 'FROM_UNIXTIME(createdAt, "%Y-%m-%d %H:%i:%s")',
            'updatedAtFormat' => 'FROM_UNIXTIME(updatedAt, "%Y-%m-%d %H:%i:%s")',
            'createdByName' => User::find()->alias('u')->select(['fullName'])->where('u.createdBy = user.createdBy'),
            'updatedByName' => User::find()->alias('u')->select(['fullName'])->where('u.updatedBy = user.updatedBy'),
        ]);
    }
}
