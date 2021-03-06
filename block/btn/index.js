import { __ } from '@wordpress/i18n';

import blockConfig from '@smb/config/block';
import metadata from './block.json';
import edit from './edit';
import save from './save';
import deprecated from './deprecated';
import example from './example';

const { name } = metadata;

export { metadata, name };

export const settings = {
	title: __( 'Button', 'snow-monkey-blocks' ),
	description: __(
		'Prompt visitors to take action with a button-style link.',
		'snow-monkey-blocks'
	),
	icon: {
		foreground: blockConfig.blockIconColor,
		src: 'embed-generic',
	},
	edit,
	save,
	styles: [
		{
			name: 'default',
			label: __( 'Default', 'snow-monkey-blocks' ),
			isDefault: true,
		},
		{ name: 'ghost', label: __( 'Ghost', 'snow-monkey-blocks' ) },
	],
	deprecated,
	example,
};
