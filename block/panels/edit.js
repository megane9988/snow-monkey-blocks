import classnames from 'classnames';

import { PanelBody, RangeControl, ToggleControl } from '@wordpress/components';

import {
	InnerBlocks,
	InspectorControls,
	useBlockProps,
	__experimentalUseInnerBlocksProps as useInnerBlocksProps,
} from '@wordpress/block-editor';

import { __ } from '@wordpress/i18n';

import { toNumber } from '@smb/helper';
import ResponsiveTabPanel from '@smb/component/responsive-tab-panel';

export default function ( { attributes, setAttributes, className } ) {
	const { sm, md, lg, imagePadding } = attributes;

	const allowedBlocks = [
		'snow-monkey-blocks/panels--item',
		'snow-monkey-blocks/panels--item--horizontal',
	];
	const template = [ [ 'snow-monkey-blocks/panels--item' ] ];

	const classes = classnames( 'smb-panels', className );

	const blockProps = useBlockProps( {
		className: classes,
	} );

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: [ 'c-row', 'c-row--margin', 'c-row--fill' ],
		},
		{
			allowedBlocks,
			template,
			templateLock: false,
			renderAppender: InnerBlocks.ButtonBlockAppender,
		}
	);

	const onChangeLg = ( value ) =>
		setAttributes( {
			lg: toNumber( value, 1, 4 ),
		} );

	const onChangeMd = ( value ) =>
		setAttributes( {
			md: toNumber( value, 1, 4 ),
		} );

	const onChangeSm = ( value ) =>
		setAttributes( {
			sm: toNumber( value, 1, 4 ),
		} );

	const onChangeImagePadding = ( value ) =>
		setAttributes( {
			imagePadding: value,
		} );

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Block Settings', 'snow-monkey-blocks' ) }
				>
					<ResponsiveTabPanel
						desktop={ () => {
							return (
								<RangeControl
									label={ __(
										'Columns per row (Large window)',
										'snow-monkey-blocks'
									) }
									value={ lg }
									onChange={ onChangeLg }
									min="1"
									max="4"
								/>
							);
						} }
						tablet={ () => {
							return (
								<RangeControl
									label={ __(
										'Columns per row (Medium window)',
										'snow-monkey-blocks'
									) }
									value={ md }
									onChange={ onChangeMd }
									min="1"
									max="4"
								/>
							);
						} }
						mobile={ () => {
							return (
								<RangeControl
									label={ __(
										'Columns per row (Small window)',
										'snow-monkey-blocks'
									) }
									value={ sm }
									onChange={ onChangeSm }
									min="1"
									max="4"
								/>
							);
						} }
					/>

					<ToggleControl
						label={ __(
							'Set padding around images',
							'snow-monkey-blocks'
						) }
						checked={ imagePadding }
						onChange={ onChangeImagePadding }
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps } data-image-padding={ imagePadding }>
				<div
					{ ...innerBlocksProps }
					data-columns={ sm }
					data-md-columns={ md }
					data-lg-columns={ lg }
				/>
			</div>
		</>
	);
}
