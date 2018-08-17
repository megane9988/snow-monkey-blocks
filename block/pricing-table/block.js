'use strict';

import classnames from 'classnames';

const { get, times, flatten } = lodash;
const { registerBlockType } = wp.blocks;
const { RichText, InspectorControls, PanelColorSettings } = wp.editor;
const { PanelBody, RangeControl, SelectControl, TextControl } = wp.components;
const { Fragment } = wp.element;
const { __, sprintf } = wp.i18n;

registerBlockType('snow-monkey-awesome-custom-blocks/pricing-table', {
  title: __('Pricing table', 'snow-monkey-awesome-custom-blocks'),
  icon: 'warning',
  category: 'smacb',
  attributes: {
    content: {
      type: 'array',
      default: [
        {
          title: [],
          price: [],
          lede: [],
          list: [],
          btnLabel: [],
          btnURL: '',
          btnTarget: '',
          btnBackgroundColor: '',
          btnTextColor: '',
        }
      ],
    },
    columns: {
      type: 'number',
      default: 1,
    },
  },

  edit({ attributes, setAttributes, isSelected }) {
    const { content, columns } = attributes;

    const generateUpdatedAttribute = (parent, index, attribute, value) => {
      let newParent = [...parent];
      newParent[ index ] = get(newParent, index, {});
      newParent[ index ][ attribute ] = value;
      return newParent;
    }

    return (
      <Fragment>
        <InspectorControls>
          <PanelBody title={ __('Columns Settings', 'snow-monkey-awesome-custom-blocks') }>
            <RangeControl
              label={ __('Columns', 'snow-monkey-awesome-custom-blocks') }
              value={ columns }
              onChange={ value => setAttributes({ columns: value }) }
              min="1"
              max="6"
            />
          </PanelBody>

          { times(columns, (index) => {
            const btnURL    = get(content, [index, 'btnURL']);
            const btnTarget = get(content, [index, 'btnTarget']);

            return (
              <PanelBody title={ sprintf( __('(%s) Button Settings', 'snow-monkey-awesome-custom-blocks'), index + 1) }>
                <TextControl
                  label={ __('URL', 'snow-monkey-awesome-custom-blocks') }
                  value={ btnURL }
                  onChange={ value => setAttributes({ content: generateUpdatedAttribute(content, index, 'btnURL', value) }) }
                />
                <SelectControl
                  label={ __('Target', 'snow-monkey-awesome-custom-blocks') }
                  value={ btnTarget }
                  options={ [
                    {
                      value: '_self',
                      label: __('_self', 'snow-monkey-awesome-custom-blocks')
                    },
                    {
                      value: '_blank',
                      label: __('_blank', 'snow-monkey-awesome-custom-blocks')
                    }
                  ] }
                  onChange={ value => setAttributes({ content: generateUpdatedAttribute(content, index, 'btnTarget', value) }) }
                />
              </PanelBody>
            );
          } ) }

          <PanelColorSettings
            title={ __('Color Settings', 'snow-monkey-awesome-custom-blocks') }
            initialOpen={ false }
            colorSettings={ flatten(times(columns, (index) => {
              const btnBackgroundColor = get(content, [index, 'btnBackgroundColor']);
              const btnTextColor       = get(content, [index, 'btnTextColor']);

              return [
                {
                  value: btnBackgroundColor,
                  label: sprintf(__('(%s) Button Background Color', 'snow-monkey-awesome-custom-blocks'), index + 1),
                  onChange: value => setAttributes({ content: generateUpdatedAttribute(content, index, 'btnBackgroundColor', value) })
                },
                {
                  value: btnTextColor,
                  label: sprintf(__('(%s) Button Text Color', 'snow-monkey-awesome-custom-blocks'), index + 1),
                  onChange: value => setAttributes({ content: generateUpdatedAttribute(content, index, 'btnTextColor', value) })
                }
              ];
            })) }
          >
          </PanelColorSettings>
        </InspectorControls>

        <div className={ classnames('smacb-pricing-table', [`smacb-pricing-table--${columns}`]) }>
          <div className="smacb-pricing-table__row">
            { times(columns, (index) => {
              const title              = get(content, [index, 'title'], []);
              const price              = get(content, [index, 'price'], []);
              const lede               = get(content, [index, 'lede'], []);
              const list               = get(content, [index, 'list'], []);
              const btnLabel           = get(content, [index, 'btnLabel'], []);
              const btnURL             = get(content, [index, 'btnURL']);
              const btnTarget          = get(content, [index, 'btnTarget']);
              const btnBackgroundColor = get(content, [index, 'btnBackgroundColor']);
              const btnTextColor       = get(content, [index, 'btnTextColor']);

              return (
                <div className="smacb-pricing-table__col">
                  <div className="smacb-pricing-table__item">
                    <RichText
                      className="smacb-pricing-table__item__title"
                      placeholder={ __('Write title…', 'snow-monkey-awesome-custom-blocks') }
                      value={ title }
                      formattingControls={ [] }
                      onChange={ value => setAttributes({ content: generateUpdatedAttribute(content, index, 'title', value) }) }
                    />

                    { (price.length > 0 || isSelected) &&
                      <RichText
                        className="smacb-pricing-table__item__price"
                        placeholder={ __('Write price…', 'snow-monkey-awesome-custom-blocks') }
                        value={ price }
                        formattingControls={ [] }
                        onChange={ value => setAttributes({ content: generateUpdatedAttribute(content, index, 'price', value) }) }
                      />
                    }

                    { (lede.length > 0 || isSelected) &&
                      <RichText
                        className="smacb-pricing-table__item__lede"
                        placeholder={ __('Write lede…', 'snow-monkey-awesome-custom-blocks') }
                        value={ lede }
                        formattingControls={ [] }
                        onChange={ value => setAttributes({ content: generateUpdatedAttribute(content, index, 'lede', value) }) }
                      />
                    }

                    <RichText
                      tagName="ul"
                      multiline="li"
                      value={ list }
                      onChange={ value => setAttributes({ content: generateUpdatedAttribute(content, index, 'list', value) }) }
                    />

                    { (btnLabel.length > 0 || !! btnURL || isSelected) &&
                      <div className="smacb-pricing-table__item__action">
                        <span className="smacb-pricing-table__item__btn smacb-btn"
                          href={ btnURL }
                          target={ btnTarget }
                          style={ { backgroundColor: btnBackgroundColor } }
                          >
                          <RichText
                            className="smacb-btn__label"
                            style={ { color: btnTextColor } }
                            value={ btnLabel }
                            placeholder={ __('Button', 'snow-monkey-awesome-custom-blocks') }
                            formattingControls={ [] }
                            onChange={ value => setAttributes({ content: generateUpdatedAttribute(content, index, 'btnLabel', value) }) }
                          />
                        </span>
                      </div>
                    }
                  </div>
                </div>
              );
            } ) }
          </div>
        </div>
      </Fragment>
    );
  },

  save({ attributes }) {
    const { content, columns } = attributes;

    return (
      <div className={ classnames('smacb-pricing-table', [`smacb-pricing-table--${columns}`]) }>
        <div className="smacb-pricing-table__row">
          { times(columns, (index) => {
            const title              = get(content, [index, 'title'], []);
            const price              = get(content, [index, 'price'], []);
            const lede               = get(content, [index, 'lede'], []);
            const list               = get(content, [index, 'list'], []);
            const btnLabel           = get(content, [index, 'btnLabel'], []);
            const btnURL             = get(content, [index, 'btnURL']);
            const btnTarget          = get(content, [index, 'btnTarget']);
            const btnBackgroundColor = get(content, [index, 'btnBackgroundColor']);
            const btnTextColor       = get(content, [index, 'btnTextColor']);

            return (
              <div className="smacb-pricing-table__col">
                <div className="smacb-pricing-table__item">
                  <div className="smacb-pricing-table__item__title">
                    { title }
                  </div>

                  { price.length > 0 &&
                    <div className="smacb-pricing-table__item__price">
                      { price }
                    </div>
                  }

                  { lede.length > 0 &&
                    <div className="smacb-pricing-table__item__lede">
                      { lede }
                    </div>
                  }

                  <ul>
                    { list }
                  </ul>

                  { (btnLabel.length > 0 || btnURL) &&
                    <div className="smacb-pricing-table__item__action">
                      <a className="smacb-pricing-table__item__btn smacb-btn"
                        href={ btnURL }
                        target={ btnTarget }
                        style={ { backgroundColor: btnBackgroundColor } }
                        >
                        <span className="smacb-btn__label" style={ { color: btnTextColor } }>
                          { btnLabel }
                        </span>
                      </a>
                    </div>
                  }
                </div>
              </div>
            )
          }) }
        </div>
      </div>
    );
  },
} );
