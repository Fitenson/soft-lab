<?php

use backend\components\db\DbMigration;


class m250919_000438_create_client_database_has_refresh_token extends DbMigration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $tableOptions = $this->tableOptions;

        $this->createTable('client_database_has_refresh_token', array_merge([
            'UUID' => $this->char(40)->notNull()->append('PRIMARY KEY')->unique(),
            'clientDatabase' => $this->char(40)->notNull(),
            'user' => $this->char(40)->notNull(),
            'refreshTokenHash'=> $this->string(),
            'expiresAt' => $this->string(30)->notNull(),
        ], $this->timestamps(), $this->systemFields()), $tableOptions);


        $this->createTable('client_database_has_refresh_token_history', array_merge([
            'historyUUID' => $this->char(40)->notNull()->append('PRIMARY KEY')->unique(),
            'UUID' => $this->char(40)->notNull(),
            'clientDatabase' => $this->char(40)->notNull(),
            'user' => $this->char(40)->notNull(),
            'refreshTokenHash'=> $this->string(),
            'expiresAt' => $this->string(30)->notNull(),
        ], $this->timestamps(), $this->systemFields(), $this->historyFields()), $tableOptions);


        $this->createForeignKey()
        ->table('client_database_has_refresh_token')
        ->column('clientDatabase')
        ->refTable('client_database')
        ->refColumn('UUID')
        ->onDeleteCascade()
        ->build();

        $this->createForeignKey()
        ->table('client_database_has_refresh_token')
        ->column('user')
        ->refTable('user')
        ->refColumn('UUID')
        ->onDeleteCascade()
        ->build();
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('{{%client_database_has_refresh_token}}');
        $this->dropTable('{{%client_database_has_refresh_token_history}}');
    }

    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo "m250919_000438_create_client_database_has_refresh_token cannot be reverted.\n";

        return false;
    }
    */
}
