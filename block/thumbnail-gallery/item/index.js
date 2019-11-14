'use strict';

import blockConfig from '../../../src/js/config/block';
import attributes from './attributes';
import edit from './edit';
import save from './save';
import deprecated from './deprecated';

import {
	__,
} from '@wordpress/i18n';

export const name = 'snow-monkey-blocks/thumbnail-gallery--item';

export const settings = {
	title: __( 'Items', 'snow-monkey-blocks' ),
	description: __( 'It is a child block of the thumbnail gallery block.', 'snow-monkey-blocks' ),
	icon: {
		foreground: blockConfig.blockIconColor,
		src: 'format-gallery',
	},
	category: blockConfig.blockCategories.common,
	parent: [ 'snow-monkey-blocks/thumbnail-gallery' ],
	attributes,
	edit,
	save,
	deprecated,
};