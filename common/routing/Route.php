<?php

namespace common\routing;

use yii\base\Component;


class Route extends Component {
    private array $routes = [];

    private ?string $prefix;

    public function prefix(string $prefix): self
    {
        $this->prefix = trim($prefix, '/');
        return $this;
    }


    public function group(callable $callback): void
    {
        $previousPrefix = $this->prefix;
        $callback($this);
        $this->prefix = $previousPrefix;
    }


    public function get(string $url, string $action): self
    {
        $controllerAction = $action;

        if(!empty($this->prefix)) {
            $controllerAction = $this->prefix . '/' . $action;
        }

        $this->routes[$url] = $controllerAction;
        return $this;
    }


    public function post(string $url, string $action): self
    {
        $controllerAction = $action;

        if(!empty($this->prefix)) {
            $controllerAction = $this->prefix . '/' . $action;
        }

        $this->routes['POST ' . $url] = $controllerAction;
        return $this;
    }


    public function all(): array
    {
        return self::$routes;
    }
}
