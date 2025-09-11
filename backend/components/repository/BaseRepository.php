<?php

namespace backend\components\repository;


abstract class BaseRepository {
    protected function getParams(array $params): array
    {
        $valid = empty($params['valid']) ? [] : ['valid' => $params['valid']]; 
        $filterFields = isset($Params['filter']) ? json_decode($Params['filter'], true) : []; 
        unset($filterFields["undefined"]); 
        $likeFilterFields = []; 
        $sort = []; 

        $limit = isset($Params['limit']) ? $Params['limit'] : 1; 
        $offset = isset($Params['offset']) ? $Params['offset'] : 0; 
        $compare = isset($Params['compare']) ? json_decode($Params['compare'], true) : []; 
        
        $compareFields = []; 

        foreach ($compare as $oneCompare) { 
            $compareFields = empty($compareFields) ? ['AND'] : $compareFields; 
            $oneCompare[2] = strtotime(str_replace("/", "-", $oneCompare[2])); 
            $compareFields[] = $oneCompare; 
        } 
        
        if (isset($Params['sort'])) { 
            $Params['sort'] = (str_contains($Params['sort'], 'Format')) ? str_replace('Format', '', $Params['sort']) : $Params['sort']; 
            $sort = [$Params['sort'] => ($Params['order'] == "desc") ? 3 : 4]; 
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
}
