<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 */

use Snow_Monkey\Plugin\Blocks;

/**
 * script
 */
wp_register_script(
	'snow-monkey-blocks/section-with-bgvideo',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/section-with-bgvideo/script.js',
	[],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/section-with-bgvideo/script.js' ),
	true
);

/**
 * style
 */
wp_register_style(
	'snow-monkey-blocks/section-with-bgvideo',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/section-with-bgvideo/style.css',
	[ 'snow-monkey-blocks', 'snow-monkey-blocks/section' ],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/section-with-bgvideo/style.css' )
);

/**
 * editor_script
 */
$asset = include( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/section-with-bgvideo/editor.asset.php' );
wp_register_script(
	'snow-monkey-blocks/section-with-bgvideo/editor',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/section-with-bgvideo/editor.js',
	array_merge( $asset['dependencies'], [ 'snow-monkey-blocks-editor', 'snow-monkey-blocks/section/editor' ] ),
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/section-with-bgvideo/editor.js' ),
	true
);

/**
 * editor_style
 */
wp_register_style(
	'snow-monkey-blocks/section-with-bgvideo/editor',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/section-with-bgvideo/editor.css',
	[ 'snow-monkey-blocks-editor', 'snow-monkey-blocks/section-with-bgvideo' ],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/section-with-bgvideo/editor.css' )
);

register_block_type_from_metadata(
	__DIR__,
	[
		'style'         => 'snow-monkey-blocks/section-with-bgvideo',
		'script'        => ! is_admin() ? 'snow-monkey-blocks/section-with-bgvideo' : null,
		'editor_script' => 'snow-monkey-blocks/section-with-bgvideo/editor',
		'editor_style'  => 'snow-monkey-blocks/section-with-bgvideo/editor',
	]
);

/**
 * nopro
 */
if ( ! Blocks\is_pro() && is_admin() ) {
	wp_enqueue_style(
		'snow-monkey-blocks/section-with-bgvideo/nopro/editor',
		SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/section-with-bgvideo/nopro-editor.css',
		[],
		filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/section-with-bgvideo/nopro-editor.css' )
	);
}

/**
 * excerpt_allowed_blocks
 */
add_filter(
	'excerpt_allowed_blocks',
	function( $allowed_blocks ) {
		return array_merge(
			$allowed_blocks,
			[
				'snow-monkey-blocks/section-with-bgvideo',
			]
		);
	}
);
