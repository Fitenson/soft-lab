<?php

namespace backend\components\request;

use Yii;
use yii\base\Component;
use yii\web\UnprocessableEntityHttpException;


class RequestHandler extends Component {
    public function getJsonString(string $formRequest): array
    {
        if(class_parents($formRequest) != FormRequest::class) {
            throw new UnprocessableEntityHttpException('Form Request parent class must be from backend component');
        }

        $formRequest = new $formRequest;

        if(empty($formRequest->name)) {
            $rawData = Yii::$app->request->post();
            return json_decode($rawData, true);
        }

        $rawData = Yii::$app->request->post()[$formRequest->name];
        return json_decode($rawData, true);
    }


    public function getFormData(string $formRequest): array
    {
        if(class_parents($formRequest) != FormRequest::class) {
            throw new UnprocessableEntityHttpException('Form Request parent class must be from backend component');
        }

        $formRequest = new $formRequest;

        if(empty($formRequest->name)) {
            return Yii::$app->request->post();
        }

        return Yii::$app->request->post()[$formRequest->name];
    }
}
