<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 */

use Snow_Monkey\Plugin\Blocks;

/**
 * style
 */
wp_register_style(
	'snow-monkey-blocks/section-side-heading',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/section-side-heading/style.css',
	[ 'snow-monkey-blocks', 'snow-monkey-blocks/section' ],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/section-side-heading/style.css' )
);

/**
 * editor_script
 */
$asset = include( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/section-side-heading/editor.asset.php' );
wp_register_script(
	'snow-monkey-blocks/section-side-heading/editor',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/section-side-heading/editor.js',
	array_merge( $asset['dependencies'], [ 'snow-monkey-blocks-editor', 'snow-monkey-blocks/section/editor' ] ),
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/section-side-heading/editor.js' ),
	true
);

register_block_type_from_metadata(
	__DIR__,
	[
		'style'         => 'snow-monkey-blocks/section-side-heading',
		'editor_script' => 'snow-monkey-blocks/section-side-heading/editor',
	]
);

/**
 * nopro
 */
if ( ! Blocks\is_pro() && is_admin() ) {
	wp_enqueue_style(
		'snow-monkey-blocks/section-side-heading/nopro/editor',
		SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/section-side-heading/nopro-editor.css',
		[],
		filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/section-side-heading/nopro-editor.css' )
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
				'snow-monkey-blocks/section-side-heading',
			]
		);
	}
);
