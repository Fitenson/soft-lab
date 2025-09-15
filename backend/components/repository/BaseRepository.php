<?php

namespace backend\components\repository;

use Yii;


abstract class BaseRepository {
    protected function getParams(array $params): array
    {
        $valid = empty($params['valid']) ? [] : ['valid' => $params['valid']]; 
        $filterFields = isset($Params['filter']) ? json_decode($Params['filter'], true) : []; 
        unset($filterFields["undefined"]); 
        $likeFilterFields = []; 
        $sort = []; 

        $limit = isset($params['limit']) ? $params['limit'] : 1; 
        $offset = isset($params['offset']) ? $params['offset'] : 0; 
        $compare = isset($params['compare']) ? json_decode($params['compare'], true) : []; 
        
        $compareFields = []; 

        foreach ($compare as $oneCompare) { 
            $compareFields = empty($compareFields) ? ['AND'] : $compareFields; 
            $oneCompare[2] = strtotime(str_replace("/", "-", $oneCompare[2])); 
            $compareFields[] = $oneCompare; 
        } 
        
        if (isset($params['sort'])) { 
            $params['sort'] = (str_contains($params['sort'], 'Format')) ? str_replace('Format', '', $params['sort']) : $params['sort']; 
            $sort = [$params['sort'] => ($params['order'] == "desc") ? 3 : 4]; 
        } 

        foreach ($filterFields as $fieldName => $filterString) { 
            $likeFilterFields = empty($likeFilterFields) ? ['AND'] : $likeFilterFields; 
            
            if ($filterString === null) { 
                    $likeFilterFields[] = [$fieldName => $filterString];
            } else if (is_array($filterString)) { 
                $likeFilterFields[] = [$fieldName => $filterString]; 
            } else { 
                $likeFilterFields[] = ['like', $fieldName, $filterString]; 
            } 
        }


        return [
            'offset' => $offset,
            'sort' => $sort,
            'limit' => $limit,
            'valid' => $valid,
            'likeFilterFields' => $likeFilterFields,
            'compareFields' => $compareFields
        ];
    }


    protected function getActionUUID(): string
    {
        $_actionUUID = Yii::$app->params['_actionUUID'];
        return $_actionUUID;
    }
}
