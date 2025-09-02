<?php

namespace frontend\assets;

use yii\web\AssetBundle;
use Yii;

class InertiaAsset extends AssetBundle
{
    public $sourcePath = '@webroot/dist';
    public $baseUrl = '@web/dist';
    public $jsOptions = [
        'type' => 'module',
    ];

    public function init()
    {
        parent::init();

        $manifestPath = Yii::getAlias($this->sourcePath . '/manifest.json'); // 👈 correct path
        if (!file_exists($manifestPath)) {
            throw new \Exception("Vite manifest not found: $manifestPath. Did you run `npm run build`?");
        }

        $manifest = json_decode(file_get_contents($manifestPath), true);

        $entry = 'src/main.tsx'; // vite default entry
        if (!isset($manifest[$entry])) {
            throw new \Exception("Entry '$entry' not found in manifest.json");
        }

        // Add JS
        $this->js[] = $manifest[$entry]['file'];

        // Add CSS
        if (!empty($manifest[$entry]['css'])) {
            foreach ($manifest[$entry]['css'] as $cssFile) {
                $this->css[] = $cssFile;
            }
        }
    }
}
