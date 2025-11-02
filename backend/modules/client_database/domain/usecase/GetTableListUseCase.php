<?php

namespace backend\modules\client_database\domain\usecase;

use Yii;
use backend\modules\client_database\data\models\ClientDatabase;
use backend\modules\client_database\domain\entity\ClientDatabaseEntity;


class GetTableListUseCase {
    public function execute(array $params, string $refreshToken): array
    {
        $ClientDatabase = ClientDatabase::find()
        ->byRefreshToken($refreshToken)
        ->one();

        $clientDatabaseEntity = new ClientDatabaseEntity($ClientDatabase->getAttributes());


        return Yii::$app->clientDatabase->connect($clientDatabaseEntity, function ($db) use ($params) {
            // Extract pagination + filter params with defaults
            $offset = isset($params['offset']) ? (int)$params['offset'] : 0;
            $limit = isset($params['limit']) ? (int)$params['limit'] : 10;
            $filter = isset($params['filter']) ? trim($params['filter']) : '';

            $tables = $db->createCommand('SHOW TABLES')->queryColumn();
        
            if (!empty($filter)) {
                $tables = array_filter($tables, function ($tableName) use ($filter) {
                    return stripos($tableName, $filter) !== false;
                });
            }

            // Get total count before pagination
            $total = count($tables);
            $pagedTables = array_slice($tables, $offset, $limit);

            // Return structured data
            return [
                'total' => $total,
                'rows' => array_map(fn($t) => ['table' => $t], $pagedTables),
            ];
        });
    }
}
