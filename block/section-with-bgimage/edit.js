import classnames from 'classnames';
import { times } from 'lodash';

import {
	ColorPalette,
	InnerBlocks,
	InspectorControls,
	PanelColorSettings,
	RichText,
	useBlockProps,
	__experimentalUseInnerBlocksProps as useInnerBlocksProps,
} from '@wordpress/block-editor';

import {
	BaseControl,
	Button,
	PanelBody,
	RangeControl,
	SelectControl,
	ToggleControl,
} from '@wordpress/components';

import { useSelect } from '@wordpress/data';

import { __ } from '@wordpress/i18n';

import { toNumber, getMediaType } from '@smb/helper';
import ResponsiveTabPanel from '@smb/component/responsive-tab-panel';
import Figure from '@smb/component/figure';

export default function ( {
	attributes,
	setAttributes,
	isSelected,
	className,
	clientId,
} ) {
	const {
		wrapperTagName,
		titleTagName,
		title,
		subtitle,
		lede,
		lgImageID,
		lgImageURL,
		lgImageAlt,
		lgImageMediaType,
		lgImageRepeat,
		mdImageID,
		mdImageURL,
		mdImageAlt,
		mdImageMediaType,
		mdImageRepeat,
		smImageID,
		smImageURL,
		smImageAlt,
		smImageMediaType,
		smImageRepeat,
		height,
		contentsAlignment,
		maskColor,
		maskColor2,
		maskColorAngle,
		maskOpacity,
		textColor,
		parallax,
		isSlim,
	} = attributes;

	const hasInnerBlocks = useSelect(
		( select ) => {
			const { getBlock } = select( 'core/block-editor' );
			const block = getBlock( clientId );
			return !! ( block && block.innerBlocks.length );
		},
		[ clientId ]
	);

	const wrapperTagNames = [ 'div', 'section', 'aside' ];
	const titleTagNames = [ 'h1', 'h2', 'h3', 'none' ];

	const TagName = wrapperTagName;
	const classes = classnames(
		'smb-section',
		'smb-section-with-bgimage',
		`smb-section-with-bgimage--${ contentsAlignment }`,
		`smb-section-with-bgimage--${ height }`,
		className,
		{
			'js-bg-parallax': !! parallax,
		}
	);

	const bgimageClasses = classnames( 'smb-section-with-bgimage__bgimage', {
		'js-bg-parallax__bgimage': !! parallax,
	} );

	const containerClasses = classnames( 'c-container', {
		'u-slim-width': !! isSlim,
	} );

	const sectionStyles = {
		color: textColor || undefined,
	};

	const maskStyles = {};
	if ( maskColor ) {
		maskStyles.backgroundColor = maskColor;
		if ( maskColor2 ) {
			maskStyles.backgroundImage = `linear-gradient(${ maskColorAngle }deg, ${ maskColor } 0%, ${ maskColor2 } 100%)`;
		}
	}

	const bgimageStyles = {
		opacity: maskOpacity,
	};

	const repeatableLgImageStyles = {
		opacity: maskOpacity,
		backgroundImage: `url( ${ lgImageURL } )`,
	};

	const repeatableMdImageStyles = {
		opacity: maskOpacity,
		backgroundImage: `url( ${ mdImageURL } )`,
	};

	const repeatableSmImageStyles = {
		opacity: maskOpacity,
		backgroundImage: `url( ${ smImageURL } )`,
	};

	const blockProps = useBlockProps( {
		className: classes,
		style: sectionStyles,
	} );

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: [ 'smb-section__body' ],
		},
		{
			renderAppender: hasInnerBlocks
				? undefined
				: InnerBlocks.ButtonBlockAppender,
		}
	);

	const onChangeHeight = ( value ) =>
		setAttributes( {
			height: value,
		} );

	const onChangeContentAlignment = ( value ) =>
		setAttributes( {
			contentsAlignment: value,
		} );

	const onChangeParallax = ( value ) =>
		setAttributes( {
			parallax: value,
		} );

	const onChangeIsSlim = ( value ) =>
		setAttributes( {
			isSlim: value,
		} );

	const onSelectLgImage = ( media ) => {
		const newImageURL =
			!! media.sizes && !! media.sizes.large
				? media.sizes.large.url
				: media.url;

		setAttributes( {
			lgImageURL: newImageURL,
			lgImageID: media.id,
			lgImageAlt: media.alt,
			lgImageMediaType: getMediaType( media ),
		} );
	};

	const onSelectLgImageURL = ( newURL ) => {
		if ( newURL !== lgImageURL ) {
			setAttributes( {
				lgImageURL: newURL,
				lgImageID: 0,
			} );
		}
	};

	const onRemoveLgImage = () =>
		setAttributes( {
			lgImageURL: '',
			lgImageAlt: '',
			lgImageID: 0,
			lgImageMediaType: undefined,
		} );

	const onChangeLgImageRepeat = ( value ) =>
		setAttributes( {
			lgImageRepeat: value,
		} );

	const onSelectMdImage = ( media ) => {
		const newImageURL =
			!! media.sizes && !! media.sizes.large
				? media.sizes.large.url
				: media.url;

		setAttributes( {
			mdImageURL: newImageURL,
			mdImageID: media.id,
			mdImageAlt: media.alt,
			mdImageMediaType: getMediaType( media ),
		} );
	};

	const onSelectMdImageURL = ( newURL ) => {
		if ( newURL !== mdImageURL ) {
			setAttributes( {
				mdImageURL: newURL,
				mdImageID: 0,
			} );
		}
	};

	const onRemoveMdImage = () =>
		setAttributes( {
			mdImageURL: '',
			mdImageAlt: '',
			mdImageID: 0,
			mdImageMediaType: undefined,
		} );

	const onChangeMdImageRepeat = ( value ) =>
		setAttributes( {
			mdImageRepeat: value,
		} );

	const onSelectSmImage = ( media ) => {
		const newImageURL =
			!! media.sizes && !! media.sizes.large
				? media.sizes.large.url
				: media.url;

		setAttributes( {
			smImageURL: newImageURL,
			smImageID: media.id,
			smImageAlt: media.alt,
			smImageMediaType: getMediaType( media ),
		} );
	};

	const onSelectSmImageURL = ( newURL ) => {
		if ( newURL !== smImageURL ) {
			setAttributes( {
				smImageURL: newURL,
				smImageID: 0,
			} );
		}
	};

	const onRemoveSmImage = () =>
		setAttributes( {
			smImageURL: '',
			smImageAlt: '',
			smImageID: 0,
			smImageMediaType: undefined,
		} );

	const onChangeSmImageRepeat = ( value ) =>
		setAttributes( {
			smImageRepeat: value,
		} );

	const onChangeMaskColor = ( value ) =>
		setAttributes( {
			maskColor: value,
		} );

	const onChangeTextColor = ( value ) =>
		setAttributes( {
			textColor: value,
		} );

	const onChangeMaskOpacity = ( value ) =>
		setAttributes( {
			maskOpacity: toNumber( ( 1 - value ).toFixed( 1 ), 0, 1 ),
		} );

	const onChangeMaskColor2 = ( value ) =>
		setAttributes( {
			maskColor2: value,
		} );

	const onChangeMaskColorAngle = ( value ) =>
		setAttributes( {
			maskColorAngle: toNumber( value, 0, 360 ),
		} );

	const onChangeSubtitle = ( value ) =>
		setAttributes( {
			subtitle: value,
		} );

	const onChangeTitle = ( value ) =>
		setAttributes( {
			title: value,
		} );

	const onChangeLede = ( value ) =>
		setAttributes( {
			lede: value,
		} );

	const imageAllowdTypes = [ 'image', 'video' ];

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Block Settings', 'snow-monkey-blocks' ) }
				>
					<BaseControl
						label={ __( 'Title Tag', 'snow-monkey-blocks' ) }
						id="snow-monkey-blocks/section-with-bgimage/wrapper-tag-name"
					>
						<div className="smb-list-icon-selector">
							{ times( wrapperTagNames.length, ( index ) => {
								const onClickWrapperTagName = () =>
									setAttributes( {
										wrapperTagName:
											wrapperTagNames[ index ],
									} );

								const isPrimary =
									wrapperTagName === wrapperTagNames[ index ];
								return (
									<Button
										isPrimary={ isPrimary }
										isSecondary={ ! isPrimary }
										onClick={ onClickWrapperTagName }
										key={ index }
									>
										{ wrapperTagNames[ index ] }
									</Button>
								);
							} ) }
						</div>
					</BaseControl>

					<BaseControl
						label={ __( 'Title Tag', 'snow-monkey-blocks' ) }
						id="snow-monkey-blocks/section-with-bgimage/title-tag-names"
					>
						<div className="smb-list-icon-selector">
							{ times( titleTagNames.length, ( index ) => {
								const onClickTitleTagName = () =>
									setAttributes( {
										titleTagName: titleTagNames[ index ],
									} );

								const isPrimary =
									titleTagName === titleTagNames[ index ];
								return (
									<Button
										isPrimary={ isPrimary }
										isSecondary={ ! isPrimary }
										onClick={ onClickTitleTagName }
										key={ index }
									>
										{ titleTagNames[ index ] }
									</Button>
								);
							} ) }
						</div>
					</BaseControl>

					<SelectControl
						label={ __( 'Height', 'snow-monkey-blocks' ) }
						value={ height }
						options={ [
							{
								value: 'fit',
								label: __( 'Fit', 'snow-monkey-blocks' ),
							},
							{
								value: 'wide',
								label: __( 'Wide', 'snow-monkey-blocks' ),
							},
						] }
						onChange={ onChangeHeight }
					/>

					<SelectControl
						label={ __(
							'Contents alignment',
							'snow-monkey-blocks'
						) }
						value={ contentsAlignment }
						options={ [
							{
								value: 'left',
								label: __( 'Left side', 'snow-monkey-blocks' ),
							},
							{
								value: 'center',
								label: __( 'Center', 'snow-monkey-blocks' ),
							},
							{
								value: 'right',
								label: __( 'Right side', 'snow-monkey-blocks' ),
							},
						] }
						onChange={ onChangeContentAlignment }
					/>

					<ToggleControl
						label={ __(
							'Parallax (Deprecated)',
							'snow-monkey-blocks'
						) }
						checked={ parallax }
						onChange={ onChangeParallax }
						help={ __(
							'This setting is being retained for backwards compatibility and is not recommended for use. Its use may slow down the page display.',
							'snow-monkey-blocks'
						) }
					/>

					<ToggleControl
						label={ __(
							'Make the content width slim',
							'snow-monkey-blocks'
						) }
						checked={ isSlim }
						onChange={ onChangeIsSlim }
					/>

					<ResponsiveTabPanel
						desktop={ () => (
							<>
								<Figure
									src={ lgImageURL }
									id={ lgImageID }
									alt={ lgImageAlt }
									onSelect={ onSelectLgImage }
									onSelectURL={ onSelectLgImageURL }
									onRemove={ onRemoveLgImage }
									mediaType={ lgImageMediaType }
									allowedTypes={ imageAllowdTypes }
								/>
								{ 'image' === lgImageMediaType && (
									<ToggleControl
										label={ __(
											'Repeat images',
											'snow-monkey-blocks'
										) }
										checked={ lgImageRepeat }
										onChange={ onChangeLgImageRepeat }
									/>
								) }
							</>
						) }
						tablet={ () => (
							<>
								<Figure
									src={ mdImageURL }
									id={ mdImageID }
									alt={ mdImageAlt }
									onSelect={ onSelectMdImage }
									onSelectURL={ onSelectMdImageURL }
									onRemove={ onRemoveMdImage }
									mediaType={ mdImageMediaType }
									allowedTypes={ imageAllowdTypes }
								/>
								{ 'image' === mdImageMediaType && (
									<ToggleControl
										label={ __(
											'Repeat images',
											'snow-monkey-blocks'
										) }
										checked={ mdImageRepeat }
										onChange={ onChangeMdImageRepeat }
									/>
								) }
							</>
						) }
						mobile={ () => (
							<>
								<Figure
									src={ smImageURL }
									id={ smImageID }
									alt={ smImageAlt }
									onSelect={ onSelectSmImage }
									onSelectURL={ onSelectSmImageURL }
									onRemove={ onRemoveSmImage }
									mediaType={ smImageMediaType }
									allowedTypes={ imageAllowdTypes }
								/>
								{ 'image' === smImageMediaType && (
									<ToggleControl
										label={ __(
											'Repeat images',
											'snow-monkey-blocks'
										) }
										checked={ smImageRepeat }
										onChange={ onChangeSmImageRepeat }
									/>
								) }
							</>
						) }
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Mask Settings', 'snow-monkey-blocks' ) }
				>
					<BaseControl
						className="editor-color-palette-control"
						label={ __( 'Mask Color', 'snow-monkey-blocks' ) }
						id="snow-monkey-blocks/section-with-bgimage/mask-color"
					>
						<ColorPalette
							className="editor-color-palette-control__color-palette"
							value={ maskColor }
							onChange={ onChangeMaskColor }
						/>
					</BaseControl>

					{ maskColor && (
						<BaseControl
							className="editor-color-palette-control"
							label={ __( 'Mask Color 2', 'snow-monkey-blocks' ) }
							id="snow-monkey-blocks/section-with-bgimage/mask-color2"
						>
							<ColorPalette
								className="editor-color-palette-control__color-palette"
								value={ maskColor2 }
								onChange={ onChangeMaskColor2 }
							/>
						</BaseControl>
					) }

					{ maskColor && maskColor2 && (
						<RangeControl
							label={ __(
								'Mask Gradation Angle',
								'snow-monkey-blocks'
							) }
							value={ maskColorAngle }
							onChange={ onChangeMaskColorAngle }
							min="0"
							max="360"
						/>
					) }

					<RangeControl
						label={ __( 'Mask Opacity', 'snow-monkey-blocks' ) }
						value={ Number( ( 1 - maskOpacity ).toFixed( 1 ) ) }
						onChange={ onChangeMaskOpacity }
						min={ 0 }
						max={ 1 }
						step={ 0.1 }
					/>
				</PanelBody>

				<PanelColorSettings
					title={ __( 'Color Settings', 'snow-monkey-blocks' ) }
					initialOpen={ false }
					colorSettings={ [
						{
							value: textColor,
							onChange: onChangeTextColor,
							label: __( 'Text Color', 'snow-monkey-blocks' ),
						},
					] }
				></PanelColorSettings>
			</InspectorControls>

			<TagName { ...blockProps }>
				{ lgImageURL && (
					<div
						className={ classnames(
							bgimageClasses,
							'smb-section-with-bgimage__bgimage--lg'
						) }
					>
						{ 0 < Number( ( 1 - maskOpacity ).toFixed( 1 ) ) && (
							<div
								className="smb-section-with-bgimage__mask"
								style={ maskStyles }
							/>
						) }

						{ ( 'image' === lgImageMediaType ||
							undefined === lgImageMediaType ) &&
							lgImageRepeat && (
								<div
									className="smb-section-with-bgimage__repeatable-image"
									style={ repeatableLgImageStyles }
								>
									<img
										src={ lgImageURL }
										alt={ lgImageAlt }
										className={ `wp-image-${ lgImageID }` }
										style={ bgimageStyles }
									/>
								</div>
							) }

						{ ( 'image' === lgImageMediaType ||
							undefined === lgImageMediaType ) &&
							! lgImageRepeat && (
								<img
									src={ lgImageURL }
									alt={ lgImageAlt }
									className={ `wp-image-${ lgImageID }` }
									style={ bgimageStyles }
								/>
							) }

						{ 'video' === lgImageMediaType && (
							<video
								playsinline
								loop
								autoPlay
								muted
								src={ lgImageURL }
								style={ bgimageStyles }
							/>
						) }
					</div>
				) }

				{ mdImageURL && (
					<div
						className={ classnames(
							bgimageClasses,
							'smb-section-with-bgimage__bgimage--md'
						) }
					>
						{ 0 < Number( ( 1 - maskOpacity ).toFixed( 1 ) ) && (
							<div
								className="smb-section-with-bgimage__mask"
								style={ maskStyles }
							/>
						) }

						{ ( 'image' === mdImageMediaType ||
							undefined === mdImageMediaType ) &&
							mdImageRepeat && (
								<div
									className="smb-section-with-bgimage__repeatable-image"
									style={ repeatableMdImageStyles }
								>
									<img
										src={ mdImageURL }
										alt={ mdImageAlt }
										className={ `wp-image-${ mdImageID }` }
										style={ bgimageStyles }
									/>
								</div>
							) }

						{ ( 'image' === mdImageMediaType ||
							undefined === mdImageMediaType ) &&
							! mdImageRepeat && (
								<img
									src={ mdImageURL }
									alt={ mdImageAlt }
									className={ `wp-image-${ mdImageID }` }
									style={ bgimageStyles }
								/>
							) }

						{ 'video' === mdImageMediaType && (
							<video
								playsinline
								loop
								autoPlay
								muted
								src={ mdImageURL }
								style={ bgimageStyles }
							/>
						) }
					</div>
				) }

				{ smImageURL && (
					<div
						className={ classnames(
							bgimageClasses,
							'smb-section-with-bgimage__bgimage--sm'
						) }
					>
						{ 0 < Number( ( 1 - maskOpacity ).toFixed( 1 ) ) && (
							<div
								className="smb-section-with-bgimage__mask"
								style={ maskStyles }
							/>
						) }

						{ ( 'image' === smImageMediaType ||
							undefined === smImageMediaType ) &&
							smImageRepeat && (
								<div
									className="smb-section-with-bgimage__repeatable-image"
									style={ repeatableSmImageStyles }
								>
									<img
										src={ smImageURL }
										alt={ smImageAlt }
										className={ `wp-image-${ smImageID }` }
										style={ bgimageStyles }
									/>
								</div>
							) }

						{ ( 'image' === smImageMediaType ||
							undefined === smImageMediaType ) &&
							! smImageRepeat && (
								<img
									src={ smImageURL }
									alt={ smImageAlt }
									className={ `wp-image-${ smImageID }` }
									style={ bgimageStyles }
								/>
							) }

						{ 'video' === smImageMediaType && (
							<video
								playsinline
								loop
								autoPlay
								muted
								src={ smImageURL }
								style={ bgimageStyles }
							/>
						) }
					</div>
				) }

				<div className={ containerClasses }>
					{ ! RichText.isEmpty( title ) &&
						( ! RichText.isEmpty( subtitle ) || isSelected ) &&
						'none' !== titleTagName && (
							<RichText
								className="smb-section__subtitle"
								value={ subtitle }
								onChange={ onChangeSubtitle }
								placeholder={ __(
									'Write subtitle…',
									'snow-monkey-blocks'
								) }
							/>
						) }

					{ ( ! RichText.isEmpty( title ) || isSelected ) &&
						'none' !== titleTagName && (
							<RichText
								className="smb-section__title"
								tagName={ titleTagName }
								value={ title }
								onChange={ onChangeTitle }
								placeholder={ __(
									'Write title…',
									'snow-monkey-blocks'
								) }
							/>
						) }

					{ ! RichText.isEmpty( title ) &&
						( ! RichText.isEmpty( lede ) || isSelected ) &&
						'none' !== titleTagName && (
							<RichText
								className="smb-section__lede"
								value={ lede }
								onChange={ onChangeLede }
								placeholder={ __(
									'Write lede…',
									'snow-monkey-blocks'
								) }
							/>
						) }

					<div { ...innerBlocksProps } />
				</div>
			</TagName>
		</>
	);
}
