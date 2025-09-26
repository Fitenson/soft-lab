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

        $this->createTable('clientDatabaseHasRefreshToken', array_merge([
            'UUID' => $this->char(40)->notNull()->append('PRIMARY KEY')->unique(),
            'clientDatabase' => $this->char(40)->notNull(),
            'user' => $this->char(40)->notNull(),
            'refreshTokenHash'=> $this->string(),
            'expiresAt' => $this->string(30)->notNull(),
        ], $this->timestamps(), $this->systemFields()), $tableOptions);


        $this->createTable('clientDatabaseHasRefreshToken_history', array_merge([
            'historyUUID' => $this->char(40)->notNull()->append('PRIMARY KEY')->unique(),
            'UUID' => $this->char(40)->notNull(),
            'clientDatabase' => $this->char(40)->notNull(),
            'user' => $this->char(40)->notNull(),
            'refreshTokenHash'=> $this->string(),
            'expiresAt' => $this->string(30)->notNull(),
        ], $this->timestamps(), $this->systemFields(), $this->historyFields()), $tableOptions);

        $this->createForeignKey()
        ->table('clientDatabaseHasRefreshToken')
        ->column('createdBy')
        ->refTable('user')
        ->refColumn('UUID')
        ->onDeleteNull()
        ->build();

        $this->createForeignKey()
        ->table('clientDatabaseHasRefreshToken')
        ->column('updatedBy')
        ->refTable('user')
        ->refColumn('UUID')
        ->onDeleteNull()
        ->build();

        $this->createForeignKey()
        ->table('clientDatabaseHasRefreshToken')
        ->column('clientDatabase')
        ->refTable('clientDatabase')
        ->refColumn('UUID')
        ->onDeleteCascade()
        ->build();

        $this->createForeignKey()
        ->table('clientDatabaseHasRefreshToken')
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
        $this->dropTable('{{%clientDatabaseHasRefreshToken}}');
        $this->dropTable('{{%clientDatabaseHasRefreshToken_history}}');
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
