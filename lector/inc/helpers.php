<?php
/**
 * Helper functions
 *
 * @package Lector
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Placeholder for registering Gutenberg blocks.
 */
function lector_register_blocks() {
    // This is where you would register your block types.
    // Example:
    // register_block_type( LECTOR_THEME_DIR . 'inc/blocks/my-block' );
}
add_action( 'init', 'lector_register_blocks' );

/**
 * An example helper function.
 */
function lector_example_helper() {
    return "This is a result from a helper function.";
}
