<?php
/**
 * Plugin name: Snow Monkey Blocks
 * Version: 1.0.2
 * Text Domain: snow-monkey-blocks
 * Domain Path: /languages/
 *
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 */

namespace Snow_Monkey\Plugin\Blocks;

class Bootstrap {

	public function __construct() {
		add_action( 'plugins_loaded', [ $this, '_bootstrap' ] );
	}

	public function _bootstrap() {
		load_plugin_textdomain( 'snow-monkey-blocks', false, basename( __DIR__ ) . '/languages' );

		add_filter( 'block_categories', [ $this, '_block_categories' ] );
		add_action( 'enqueue_block_editor_assets', [ $this, '_enqueue_block_editor_assets' ] );
		add_action( 'wp_enqueue_scripts', [ $this, '_wp_enqueue_scripts' ] );
		add_action( 'wp_enqueue_scripts', [ $this, '_wp_enqueue_nopro_scripts' ] );
		add_action( 'enqueue_block_assets', [ $this, '_enqueue_block_assets' ] );
		add_action( 'enqueue_block_assets', [ $this, '_enqueue_block_nopro_assets' ] );
		add_action( 'init', [ $this, '_activate_autoupdate' ] );
		add_action( 'wp_loaded', [ $this, '_customizer_styles' ] );
	}

	/**
	 * Add block category
	 *
	 * @param array $categories
	 * @return array
	 */
	public function _block_categories( $categories ) {
		$categories[] = [
			'slug'  => 'smb',
			'title' => __( 'Snow Monkey Blocks', 'snow-monkey-blocks' )
								. __( '[Common blocks]', 'snow-monkey-blocks' ),
		];
		$categories[] = [
			'slug'  => 'smb-section',
			'title' => __( 'Snow Monkey Blocks', 'snow-monkey-blocks' )
								. __( '[Sections]', 'snow-monkey-blocks' ),
		];

		return $categories;
	}

	/**
	 * Enqueue block script for editor
	 *
	 * @return void
	 */
	public function _enqueue_block_editor_assets() {
		$relative_path = '/dist/js/blocks-build.js';
		$src  = plugin_dir_url( __FILE__ ) . $relative_path;
		$path = plugin_dir_path( __FILE__ ) . $relative_path;

		wp_register_script(
			'snow-monkey-blocks-editor-script',
			$src,
			[ 'wp-blocks', 'wp-element', 'wp-i18n' ],
			filemtime( $path ),
			true
		);

		if ( function_exists( 'gutenberg_get_jed_locale_data' ) ) {
			$locale  = gutenberg_get_jed_locale_data( 'snow-monkey-blocks' );
			$content = 'wp.i18n.setLocaleData( ' . json_encode( $locale ) . ', "snow-monkey-blocks" );';
			wp_script_add_data( 'snow-monkey-blocks-editor-script', 'data', $content );
		}

		wp_enqueue_script( 'snow-monkey-blocks-editor-script' );

		wp_localize_script(
			'snow-monkey-blocks-editor-script',
			'smb',
			[
				'pluginURL' => plugin_dir_url( __FILE__ ),
				'pluginDir' => plugin_dir_path( __FILE__ ),
			]
		);

		$relative_path = '/dist/css/blocks-editor.min.css';
		$src  = plugin_dir_url( __FILE__ ) . $relative_path;
		$path = plugin_dir_path( __FILE__ ) . $relative_path;

		wp_enqueue_style(
			'snow-monkey-blocks-editor',
			$src,
			[],
			filemtime( $path )
		);
	}

	/**
	 * Enqueue assets for front
	 *
	 * @return void
	 */
	public function _wp_enqueue_scripts() {
		$relative_path = '/dist/css/blocks.min.css';
		$src  = plugin_dir_url( __FILE__ ) . $relative_path;
		$path = plugin_dir_path( __FILE__ ) . $relative_path;

		wp_enqueue_style(
			'snow-monkey-blocks',
			$src,
			[],
			filemtime( $path )
		);
	}

	/**
	 * Enqueue nopro assets
	 *
	 * @return void
	 */
	public function _wp_enqueue_nopro_scripts() {
		if ( is_pro() ) {
			return;
		}

		$relative_path = '/dist/css/blocks-nopro.min.css';
		$src  = plugin_dir_url( __FILE__ ) . $relative_path;
		$path = plugin_dir_path( __FILE__ ) . $relative_path;

		wp_enqueue_style(
			'snow-monkey-blocks-nopro',
			$src,
			[],
			filemtime( $path )
		);

		$relative_path = '/dist/js/blocks-nopro-build.js';
		$src  = plugin_dir_url( __FILE__ ) . $relative_path;
		$path = plugin_dir_path( __FILE__ ) . $relative_path;

		wp_enqueue_script(
			'snow-monkey-blocks-nopro',
			$src,
			[ 'jquery' ],
			filemtime( $path )
		);
	}

	/**
	 * Enqueue assets for block
	 *
	 * @return void
	 */
	public function _enqueue_block_assets() {
		if ( $this->_is_snow_monkey() ) {
			return;
		}

		$relative_path = '/dist/packages/fontawesome-free/js/all.min.js';
		$src  = plugin_dir_url( __FILE__ ) . $relative_path;
		$path = plugin_dir_path( __FILE__ ) . $relative_path;

		wp_enqueue_script(
			'fontawesome5',
			$src,
			[],
			filemtime( $path )
		);

		$relative_path = '/dist/css/fallback.min.css';
		$src  = plugin_dir_url( __FILE__ ) . $relative_path;
		$path = plugin_dir_path( __FILE__ ) . $relative_path;

		wp_enqueue_style(
			'snow-monkey-blocks-fallback',
			$src,
			[],
			filemtime( $path )
		);
	}

	/**
	 * Enqueue nopro assets for block
	 *
	 * @return void
	 */
	public function _enqueue_block_nopro_assets() {
		if ( is_pro() ) {
			return;
		}

		$relative_path = '/dist/css/blocks-editor-nopro.min.css';
		$src  = plugin_dir_url( __FILE__ ) . $relative_path;
		$path = plugin_dir_path( __FILE__ ) . $relative_path;

		wp_enqueue_style(
			'snow-monkey-blocks-editor-nopro',
			$src,
			[],
			filemtime( $path )
		);
	}

	/**
	 * Apply styles from customizer settings of Snow Monkey
	 *
	 * @return void
	 */
	public function _customizer_styles() {
		if ( ! $this->_is_snow_monkey() ) {
			return;
		}

		\Inc2734\Mimizuku_Core\Core::include_files( __DIR__ . '/block/' );
	}

	/**
	 * Activate auto update using GitHub
	 *
	 * @return [void]
	 */
	public function _activate_autoupdate() {
		new \Inc2734\WP_GitHub_Plugin_Updater\GitHub_Plugin_Updater(
			plugin_basename( __FILE__ ),
			'inc2734',
			'snow-monkey-blocks'
		);
	}

	/**
	 * Return true when Snow Monkey is enabled
	 *
	 * @return boolean
	 */
	protected function _is_snow_monkey() {
		return 'snow-monkey' === get_template() || 'snow-monkey/resources' === get_template();
	}
}

require_once( __DIR__ . '/vendor/autoload.php' );
new \Snow_Monkey\Plugin\Blocks\Bootstrap();

/**
 * Whether pro version
 *
 * @return boolean
 */
function is_pro() {
	return apply_filters( 'snow_monkey_blocks_pro', false );
}
