<?php

namespace frontend\assets;

use Yii;

class Vite
{
    public static function asset(string $entry): string
    {
        $manifestPath = Yii::getAlias('@webroot/dist/.vite/manifest.json');
        if (!file_exists($manifestPath)) {
            throw new \Exception("Vite manifest not found. Run `vite build` first.");
        }

        $manifest = json_decode(file_get_contents($manifestPath), true);

        if (!isset($manifest[$entry])) {
            throw new \Exception("Entry {$entry} not found in manifest.json");
        }

        $baseUrl = Yii::getAlias('@web/dist/');
        $tags = '';

        // Add JS file
        if (isset($manifest[$entry]['file'])) {
            $tags .= '<script type="module" src="' . $baseUrl . $manifest[$entry]['file'] . '"></script>' . "\n";
        }

        // Add CSS files
        if (isset($manifest[$entry]['css'])) {
            foreach ($manifest[$entry]['css'] as $css) {
                $tags .= '<link rel="stylesheet" href="' . $baseUrl . $css . '">' . "\n";
            }
        }

        return $tags;
    }
}
