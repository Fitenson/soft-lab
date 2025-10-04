<?php

namespace backend\modules\api_test\data\query;

use backend\modules\client_database\data\models\ClientDatabase;
use backend\modules\project\data\models\Project;

/**
 * This is the ActiveQuery class for [[\backend\modules\api_test\data\models\ApiTest]].
 *
 * @see \backend\modules\api_test\data\models\ApiTest
 */
class ApiTestQuery extends \backend\components\db\AppQuery
{
    /*public function active()
    {
        return $this->andWhere('[[status]]=1');
    }*/

    /**
     * {@inheritdoc}
     * @return \backend\modules\api_test\data\models\ApiTest[]|array
     */
    public function all($db = null)
    {
        return parent::all($db);
    }

    /**
     * {@inheritdoc}
     * @return \backend\modules\api_test\data\models\ApiTest|array|null
     */
    public function one($db = null)
    {
        return parent::one($db);
    }


    public function selectIndex() {
        return $this->select([
            'apiTest.UUID',
            'apiTest.parentApiTest',
            'apiTest.clientDatabase',
            'clientDatabaseName' => ClientDatabase::find()->select(['databaseName'])->where('clientDatabase.UUID = apiTest.clientDatabase'),
            'apiTest.project',
            'apiTest.isFolder',
            'apiTest.seq',
            'projectName' => Project::find()->select(['projectName'])->where('project.UUID = apiTest.project'),
            'apiTest.testName',
            'apiTest.description',
            'apiTest.moreDescription',
            'apiTest.transmission',
        ]);
    }
}
