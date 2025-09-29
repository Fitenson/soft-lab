<?php

namespace backend\modules\api_test\data\models;

use Yii;

use backend\modules\user\data\models\User;

/**
 * This is the model class for table "apiTestHasOutput".
 *
 * @property string $UUID
 * @property string $apiTest
 * @property int $seq
 * @property string|null $description
 * @property string|null $moreDescription
 * @property string|null $json
 * @property string|null $createdAt
 * @property string|null $updatedAt
 * @property string|null $createdBy
 * @property string|null $updatedBy
 * @property int|null $valid
 * @property string|null $_actionUUID
 * @property int|null $_version
 */
class ApiTestHasOutput extends \backend\components\db\AppModel
{


    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'apiTestHasOutput';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['description', 'moreDescription', 'json', 'createdAt', 'updatedAt', 'createdBy', 'updatedBy', 'valid', '_actionUUID', '_version'], 'default', 'value' => null],
            [['UUID', 'apiTest', 'seq'], 'required'],
            [['seq', 'valid', '_version'], 'integer'],
            [['json'], 'string'],
            [['UUID', 'apiTest', 'createdAt', 'createdBy', '_actionUUID'], 'string', 'max' => 40],
            [['description'], 'string', 'max' => 255],
            [['moreDescription'], 'string', 'max' => 500],
            [['updatedAt', 'updatedBy'], 'string', 'max' => 30],
            [['UUID'], 'unique'],
            [['apiTest'], 'exist', 'skipOnError' => true, 'targetClass' => ApiTest::class, 'targetAttribute' => ['apiTest' => 'UUID']],
            [['createdBy'], 'exist', 'skipOnError' => true, 'targetClass' => User::class, 'targetAttribute' => ['createdBy' => 'UUID']],
            [['updatedBy'], 'exist', 'skipOnError' => true, 'targetClass' => User::class, 'targetAttribute' => ['updatedBy' => 'UUID']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'UUID' => 'Uuid',
            'apiTest' => 'Api Test',
            'seq' => 'Seq',
            'description' => 'Description',
            'moreDescription' => 'More Description',
            'json' => 'Json',
            'createdAt' => 'Created At',
            'updatedAt' => 'Updated At',
            'createdBy' => 'Created By',
            'updatedBy' => 'Updated By',
            'valid' => 'Valid',
            '_actionUUID' => 'Action Uuid',
            '_version' => 'Version',
        ];
    }

    /**
     * {@inheritdoc}
     * @return \backend\modules\api_test\data\query\ApiTestHasOutputQuery the active query used by this AR class.
     */
    public static function find()
    {
        return new \backend\modules\api_test\data\query\ApiTestHasOutputQuery(get_called_class());
    }

}
