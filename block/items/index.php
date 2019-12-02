<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 */

$asset = include( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/items/editor.asset.php' );

wp_register_script(
	'snow-monkey-blocks/items/editor',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/items/editor.js',
	array_merge( $asset['dependencies'], [ 'snow-monkey-blocks-editor' ] ),
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/items/editor.js' ),
	true
);

wp_register_style(
	'snow-monkey-blocks/items',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/items/front.css',
	[ 'snow-monkey-blocks' ],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/items/front.css' )
);

register_block_type(
	'snow-monkey-blocks/items',
	[
		'style'         => 'snow-monkey-blocks/items',
		'editor_script' => 'snow-monkey-blocks/items/editor',
	]
);