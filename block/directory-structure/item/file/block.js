'use strict';

import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { SnowMonkeyBlocksSvg } from '../../../../gutenberg/settings/svg.js';
import { SnowMonkeyBlocksBlockSettings } from '../../../../gutenberg/settings/block.js';
import { schema } from './_schema.js';
import { transforms } from './_transforms.js';

const { registerBlockType } = wp.blocks;
const { PanelBody, BaseControl, Button, ButtonGroup } = wp.components;
const { InspectorControls, RichText, PanelColorSettings } = wp.editor;
const { Fragment } = wp.element;
const { __ } = wp.i18n;

registerBlockType( 'snow-monkey-blocks/directory-structure--item--file', {
	title: __( 'File item', 'snow-monkey-blocks' ),
	description: __( 'Display a file item', 'snow-monkey-blocks' ),
	icon: {
		foreground: SnowMonkeyBlocksBlockSettings.blockIconColor,
		src: SnowMonkeyBlocksSvg.blockIconDirectoryStructureItemFile,
	},
	category: SnowMonkeyBlocksBlockSettings.blockCategories.common,
	attributes: schema,
	parent: [ 'snow-monkey-blocks/directory-structure' ],

	edit( { attributes, setAttributes, className } ) {
		const blockClasses = classnames(
			{
				'smb-directory-structure--item--file': true,
				[ className ]: !! className,
			}
		);
		const iconStyles = {
			color: attributes.iconColor || undefined,
		};
		const iconList = [
			{
				label: __( 'file - Solid', 'snow-monkey-blocks' ),
				key: 'file-solid',
				vendor: 'fas',
				value: 'file',
			},
			{
				label: __( 'file-alt - Solid', 'snow-monkey-blocks' ),
				key: 'file-alt-solid',
				vendor: 'fas',
				value: 'file-alt',
			},
			{
				label: __( 'file-archive - Solid', 'snow-monkey-blocks' ),
				key: 'file-archive-solid',
				vendor: 'fas',
				value: 'file-archive',
			},
			{
				label: __( 'file-code - Solid', 'snow-monkey-blocks' ),
				key: 'file-code-solid',
				vendor: 'fas',
				value: 'file-code',
			},
			{
				label: __( 'file-image - Solid', 'snow-monkey-blocks' ),
				key: 'file-image-solid',
				vendor: 'fas',
				value: 'file-image',
			},
			{
				label: __( 'file-audio - Solid', 'snow-monkey-blocks' ),
				key: 'file-audio-solid',
				vendor: 'fas',
				value: 'file-audio',
			},
			{
				label: __( 'file-video - Solid', 'snow-monkey-blocks' ),
				key: 'file-video-solid',
				vendor: 'fas',
				value: 'file-video',
			},
			{
				label: __( 'file-pdf - Solid', 'snow-monkey-blocks' ),
				key: 'file-pdf-solid',
				vendor: 'fas',
				value: 'file-pdf',
			},
			{
				label: __( 'file-excel - Solid', 'snow-monkey-blocks' ),
				key: 'file-excel-solid',
				vendor: 'fas',
				value: 'file-excel',
			},
			{
				label: __( 'file-word - Solid', 'snow-monkey-blocks' ),
				key: 'file-word-solid',
				vendor: 'fas',
				value: 'file-word',
			},
			{
				label: __( 'file-powerpoint - Solid', 'snow-monkey-blocks' ),
				key: 'file-powerpoint-solid',
				vendor: 'fas',
				value: 'file-powerpoint',
			},
			{
				label: __( 'file - Regular', 'snow-monkey-blocks' ),
				key: 'file-regular',
				vendor: 'far',
				value: 'file',
			},
			{
				label: __( 'file-alt - Regular', 'snow-monkey-blocks' ),
				key: 'file-alt-regular',
				vendor: 'far',
				value: 'file-alt',
			},
			{
				label: __( 'file-archive - Regular', 'snow-monkey-blocks' ),
				key: 'file-archive-regular',
				vendor: 'far',
				value: 'file-archive',
			},
			{
				label: __( 'file-code - Regular', 'snow-monkey-blocks' ),
				key: 'file-audio-regular',
				vendor: 'far',
				value: 'file-code',
			},
			{
				label: __( 'file-image - Regular', 'snow-monkey-blocks' ),
				key: 'file-image-regular',
				vendor: 'far',
				value: 'file-image',
			},
			{
				label: __( 'file-audio - Regular', 'snow-monkey-blocks' ),
				key: 'file-audio-regular',
				vendor: 'far',
				value: 'file-audio',
			},
			{
				label: __( 'file-video - Regular', 'snow-monkey-blocks' ),
				key: 'file-video-regular',
				vendor: 'far',
				value: 'file-video',
			},
			{
				label: __( 'file-pdf - Regular', 'snow-monkey-blocks' ),
				key: 'file-pdf-regular',
				vendor: 'far',
				value: 'file-pdf',
			},
			{
				label: __( 'file-excel - Regular', 'snow-monkey-blocks' ),
				key: 'file-excel-regular',
				vendor: 'far',
				value: 'file-excel',
			},
			{
				label: __( 'file-word - Regular', 'snow-monkey-blocks' ),
				key: 'file-word-regular',
				vendor: 'far',
				value: 'file-word',
			},
			{
				label: __( 'file-powerpoint - Regular', 'snow-monkey-blocks' ),
				key: 'file-powerpoint-regular',
				vendor: 'far',
				value: 'file-powerpoint',
			},
		];

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Icon Settings', 'snow-monkey-blocks' ) }>
						<BaseControl label={ __( 'Icon', 'snow-monkey-blocks' ) }>
							<ButtonGroup>
								{
									iconList.map( ( iconData ) => {
										const selected = attributes.iconVendor === iconData.vendor && attributes.iconClass === iconData.value;
										return (
											<Button
												isLarge
												isPrimary={ selected }
												aria-pressed={ selected }
												onClick={ () => {
													setAttributes( { iconVendor: iconData.vendor } );
													setAttributes( { iconClass: iconData.value } );
												} }
												key={ `icon_${ iconData.key }` }
											>
												<i className={ `fa-fw ${ iconData.vendor } fa-${ iconData.value }` } title={ iconData.label } />
											</Button>
										);
									} )
								}
							</ButtonGroup>
						</BaseControl>
					</PanelBody>
					<PanelColorSettings
						title={ __( 'Color Settings', 'snow-monkey-blocks' ) }
						initialOpen={ false }
						colorSettings={ [
							{
								value: attributes.iconColor,
								onChange: ( value ) => setAttributes( { iconColor: value } ),
								label: __( 'Icon Color', 'snow-monkey-blocks' ),
							},
						] }
					/>
				</InspectorControls>
				<div className={ blockClasses }>
					<p>
						<span className="fa-fw" style={ iconStyles }>
							<FontAwesomeIcon icon={ [ attributes.iconVendor, attributes.iconClass ] } />
						</span>
						<span className="smb-directory-structure--item--file__name">
							<RichText
								placeholder={ __( 'Write file name...', 'snow-monkey-blocks' ) }
								value={ attributes.name }
								onChange={ ( value ) => setAttributes( { name: value } ) }
							/>
						</span>
					</p>
				</div>
			</Fragment>
		);
	},

	save( { attributes, className } ) {
		const blockClasses = classnames(
			{
				'smb-directory-structure--item--file': true,
				[ className ]: !! className,
			}
		);
		const iconStyles = {
			color: attributes.iconColor || undefined,
		};

		return (
			<div className={ blockClasses }>
				<p>
					<span className="fa-fw" style={ iconStyles }>
						<i className={ `${ attributes.iconVendor } fa-${ attributes.iconClass }` } />
					</span>
					<span className="smb-directory-structure--item--file__name"><RichText.Content value={ attributes.name } /></span>
				</p>
			</div>
		);
	},

	transforms: transforms,

} );