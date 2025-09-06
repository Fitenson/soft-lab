<?php

namespace backend\components\exception;

use yii\base\Component;
use yii\web\BadRequestHttpException;
use yii\web\NotFoundHttpException;
use yii\web\ServerErrorHttpException;
use yii\web\UnauthorizedHttpException;
use yii\web\UnprocessableEntityHttpException;


class ExceptionService extends Component
{
    /**
     * Throw a mapped exception based on HTTP status code.
     *
     * @param string $message
     * @param int    $statusCode
     * @throws \Throwable
     */
    public function throw(string $message, int $statusCode): void
    {
        $map = [
            400 => BadRequestHttpException::class,
            401 => UnauthorizedHttpException::class,
            404 => NotFoundHttpException::class,
            422 => UnprocessableEntityHttpException::class,
        ];

        if (isset($map[$statusCode])) {
            throw new $map[$statusCode]($message, $statusCode);
        }

        throw new ServerErrorHttpException($message, $statusCode);
    }
}
