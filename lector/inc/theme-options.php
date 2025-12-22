<?php
/**
 * A basic Theme Options panel as a premium feature.
 *
 * @package Lector
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Class Lector_Theme_Options
 *
 * Manages the theme options page, which is a premium feature.
 */
class Lector_Theme_Options {

    /**
     * The single instance of the class.
     * @var Lector_Theme_Options|null
     */
    private static $instance = null;

    /**
     * Get the singleton instance of the class.
     * @return Lector_Theme_Options The single instance.
     */
    public static function get_instance() {
        if ( self::$instance === null ) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    /**
     * Private constructor.
     */
    private function __construct() {
        add_action( 'admin_menu', [ $this, 'add_options_page' ] );
        add_action( 'admin_init', [ $this, 'register_settings' ] );
    }

    /**
     * Add the theme options page to the admin menu.
     */
    public function add_options_page() {
        add_theme_page(
            __( 'Theme Options', 'lector' ),
            __( 'Theme Options', 'lector' ),
            'manage_options',
            'lector-theme-options',
            [ $this, 'render_options_page' ]
        );
    }

    /**
     * Render the theme options page.
     */
    public function render_options_page() {
        ?>
        <div class="wrap">
            <h1><?php _e( 'Theme Options', 'lector' ); ?></h1>
            <form action="options.php" method="post">
                <?php
                settings_fields( 'lector_options_group' );
                do_settings_sections( 'lector-theme-options' );
                submit_button();
                ?>
            </form>
        </div>
        <?php
    }

    /**
     * Register settings, sections, and fields.
     */
    public function register_settings() {
        register_setting( 'lector_options_group', 'lector_options', [ $this, 'sanitize_options' ] );

        add_settings_section(
            'lector_general_section',
            __( 'General Settings', 'lector' ),
            null,
            'lector-theme-options'
        );

        add_settings_field(
            'lector_footer_copyright',
            __( 'Footer Copyright Text', 'lector' ),
            [ $this, 'render_footer_copyright_field' ],
            'lector-theme-options',
            'lector_general_section'
        );
    }

    /**
     * Render the footer copyright input field.
     */
    public function render_footer_copyright_field() {
        $options = get_option( 'lector_options' );
        $value   = isset( $options['footer_copyright'] ) ? $options['footer_copyright'] : '';
        echo '<input type="text" id="lector_footer_copyright" name="lector_options[footer_copyright]" value="' . esc_attr( $value ) . '" class="regular-text">';
    }

    /**
     * Sanitize the theme options before saving.
     *
     * @param array $input The input options.
     * @return array The sanitized options.
     */
    public function sanitize_options( $input ) {
        $output = [];
        if ( isset( $input['footer_copyright'] ) ) {
            $output['footer_copyright'] = sanitize_text_field( $input['footer_copyright'] );
        }
        return $output;
    }
}

/**
 * Helper function to get a specific theme option.
 *
 * @param string $option_name The name of the option to retrieve.
 * @param mixed  $default     The default value if the option is not set.
 * @return mixed The option value.
 */
function lector_get_option( $option_name, $default = '' ) {
    $options = get_option( 'lector_options' );
    return isset( $options[ $option_name ] ) ? $options[ $option_name ] : $default;
}
