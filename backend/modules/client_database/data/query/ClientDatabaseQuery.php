<?php

namespace backend\modules\client_database\data\query;

use Yii;
use backend\modules\client_database\data\models\ClientDatabase;
use backend\modules\client_database\data\models\ClientDatabaseHasRefreshToken;
use backend\modules\project\data\models\Project;

/**
 * This is the ActiveQuery class for [[\backend\modules\client_database\data\models\ClientDatabase]].
 *
 * @see \backend\modules\client_database\data\models\ClientDatabase
 */
class ClientDatabaseQuery extends \backend\components\db\AppQuery
{
    /*public function active()
    {
        return $this->andWhere('[[status]]=1');
    }*/

    /**
     * {@inheritdoc}
     * @return \backend\modules\client_database\data\models\ClientDatabase[]|array
     */
    public function all($db = null)
    {
        return parent::all($db);
    }

    /**
     * {@inheritdoc}
     * @return \backend\modules\client_database\data\models\ClientDatabase|array|null
     */
    public function one($db = null)
    {
        return parent::one($db);
    }


    public function selectIndex() {
        return $this->select([
            'UUID',
            'databaseName',
            'databaseSchema',
            'host',
            'port',
            'username',
            'project',
            'projectName' => Project::find()->select(['projectName'])->where('project.UUID = clientDatabase.project'),
        ]);
    }


    public function byRefreshToken(string $refreshToken): self
    {
        $ClientDatabaseHasRefreshToken = ClientDatabaseHasRefreshToken::findOne([
            'refreshToken' => $refreshToken,
            'user' => Yii::$app->user->id
        ]);

        $this->andWhere(['UUID' => $ClientDatabaseHasRefreshToken->clientDatabase]);

        return $this;
    }
}
