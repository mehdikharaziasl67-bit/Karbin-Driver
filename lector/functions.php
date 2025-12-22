<?php
/**
 * Lector functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package Lector
 */

if ( ! defined( 'LECTOR_VERSION' ) ) {
	// Replace with the theme's version number.
	define( 'LECTOR_VERSION', '1.0.0' );
}

if ( ! defined( 'LECTOR_THEME_DIR' ) ) {
	define( 'LECTOR_THEME_DIR', trailingslashit( get_template_directory() ) );
}

if ( ! defined( 'LECTOR_THEME_URI' ) ) {
	define( 'LECTOR_THEME_URI', trailingslashit( esc_url( get_template_directory_uri() ) ) );
}

// Core theme setup.
require_once LECTOR_THEME_DIR . 'inc/helpers.php';
require_once LECTOR_THEME_DIR . 'inc/theme-options.php';

/**
 * Sets up theme defaults and registers support for various WordPress features.
 */
function lector_setup() {
	// Make theme available for translation.
	load_theme_textdomain( 'lector', LECTOR_THEME_DIR . 'languages' );

	// Add default posts and comments RSS feed links to head.
	add_theme_support( 'automatic-feed-links' );

	// Let WordPress manage the document title.
	add_theme_support( 'title-tag' );

	// Enable support for Post Thumbnails on posts and pages.
	add_theme_support( 'post-thumbnails' );

	// This theme uses wp_nav_menu() in one location.
	register_nav_menus(
		array(
			'primary' => esc_html__( 'Primary Menu', 'lector' ),
		)
	);

	// Switch default core markup for search form, comment form, and comments to output valid HTML5.
	add_theme_support(
		'html5',
		array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
			'style',
			'script',
		)
	);

	// Add theme support for selective refresh for widgets.
	add_theme_support( 'customize-selective-refresh-widgets' );

	// Add support for core custom logo.
	add_theme_support(
		'custom-logo',
		array(
			'height'      => 250,
			'width'       => 250,
			'flex-width'  => true,
			'flex-height' => true,
		)
	);

    // Add support for WooCommerce.
    add_theme_support( 'woocommerce' );

    // Add support for Gutenberg features.
    add_theme_support( 'align-wide' );
    add_theme_support( 'editor-styles' );
    add_editor_style( 'assets/css/editor-style.css' );
}
add_action( 'after_setup_theme', 'lector_setup' );

/**
 * Enqueue scripts and styles.
 */
function lector_scripts() {
	wp_enqueue_style( 'lector-style', get_stylesheet_uri(), array(), LECTOR_VERSION );
	wp_enqueue_style( 'lector-main-style', LECTOR_THEME_URI . 'assets/css/main.css', array(), LECTOR_VERSION );

	if ( is_rtl() ) {
		wp_enqueue_style( 'lector-rtl-style', LECTOR_THEME_URI . 'assets/css/rtl.css', array(), LECTOR_VERSION );
	}

	wp_enqueue_script( 'lector-main-js', LECTOR_THEME_URI . 'assets/js/main.js', array( 'jquery' ), LECTOR_VERSION, true );

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}
add_action( 'wp_enqueue_scripts', 'lector_scripts' );

// Initialize the theme options panel.
Lector_Theme_Options::get_instance();
?>