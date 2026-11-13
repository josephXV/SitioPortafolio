<?php
/**
 * Plugin Name: Portafolio API
 * Description: Carga el JavaScript que consume la API de JSON Server (habilidades, intereses y proyectos).
 * Version: 1.1.0
 */

if (!defined('ABSPATH')) {
    exit;
}

function portafolio_api_version($ruta)
{
    return file_exists($ruta) ? filemtime($ruta) : null;
}

function portafolio_api_assets()
{
    $modulos = array('habilidades', 'intereses', 'proyectos');
    $modulo = null;
    foreach ($modulos as $m) {
        if (is_page($m)) {
            $modulo = $m;
            break;
        }
    }
    if (!$modulo) {
        return;
    }

    $dir = WPMU_PLUGIN_DIR . '/portafolio-api/';
    $url = WPMU_PLUGIN_URL . '/portafolio-api/';
    $api = defined('PORTAFOLIO_API_URL') ? PORTAFOLIO_API_URL : '';

    wp_enqueue_style('portafolio-api', $url . 'portafolio-api.css', array(), portafolio_api_version($dir . 'portafolio-api.css'));
    wp_enqueue_script('portafolio-api', $url . 'portafolio-api.js', array(), portafolio_api_version($dir . 'portafolio-api.js'), true);
    wp_add_inline_script('portafolio-api', 'window.PORTAFOLIO_API = ' . wp_json_encode(array('url' => $api)) . ';', 'before');

    $js = 'modulos/' . $modulo . '.js';
    $css = 'modulos/' . $modulo . '.css';

    if (file_exists($dir . $css)) {
        wp_enqueue_style('portafolio-' . $modulo, $url . $css, array('portafolio-api'), portafolio_api_version($dir . $css));
    }
    wp_enqueue_script('portafolio-' . $modulo, $url . $js, array('portafolio-api'), portafolio_api_version($dir . $js), true);
}
add_action('wp_enqueue_scripts', 'portafolio_api_assets');
