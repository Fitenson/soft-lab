<?php

use backend\components\db\DbMigration;

class m250929_092026_create_api_test_has_output extends DbMigration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $tableOptions = $this->tableOptions;

        $this->createTable('{{%apiTestHasOutput}}', array_merge([
            'UUID' => $this->char(40)->notNull()->append('PRIMARY KEY')->unique(),
            'apiTest' => $this->char(40)->notNull(),
            'seq' => $this->smallInteger()->notNull(),
            'description' => $this->string(255)->null(),
            'moreDescription' => $this->string(500)->null(),
            'json' => $this->text()->null(),
        ], $this->timestamps(), $this->systemFields()), $tableOptions);

        $this->createTable('{{%apiTestHasOutput_history}}', array_merge([
            'historyUUID' => $this->char(40)->notNull()->append('PRIMARY KEY')->unique(),
            'UUID' => $this->char(40)->notNull(),
            'apiTest' => $this->char(40)->notNull(),
            'seq' => $this->smallInteger()->notNull(),
            'description' => $this->string(255)->null(),
            'moreDescription' => $this->string(500)->null(),
            'json' => $this->text()->null(),
        ], $this->timestamps(), $this->systemFields(), $this->historyFields()), $tableOptions);

        
        $this->createForeignKey()
        ->table('apiTestHasOutput')
        ->column('createdBy')
        ->refTable('user')
        ->refColumn('UUID')
        ->onDeleteNull()
        ->build();

        $this->createForeignKey()
        ->table('apiTestHasOutput')
        ->column('updatedBy')
        ->refTable('user')
        ->refColumn('UUID')
        ->onDeleteNull()
        ->build();

        $this->createForeignKey()
        ->table('apiTestHasOutput')
        ->column('apiTest')
        ->refTable('apiTest')
        ->refColumn('UUID')
        ->onDeleteRestrict()
        ->build();

        $this->addForeignKeys();
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('{{%apiTestHasOutput}}');
        $this->dropTable('{{%apiTestHasOutput_history}}');
    }

    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo "m250929_092026_create_api_test_has_output cannot be reverted.\n";

        return false;
    }
    */
}
