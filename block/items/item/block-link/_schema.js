'use strict';

export const schema = {
	titleTagName: {
		type: 'string',
		default: 'div',
	},
	title: {
		source: 'html',
		selector: '.smb-items__item__title',
	},
	lede: {
		source: 'html',
		selector: '.smb-items__item__lede',
	},
	summary: {
		source: 'html',
		selector: '.smb-items__item__content',
	},
	btnLabel: {
		source: 'html',
		selector: '.smb-items__item__btn > .smb-btn__label',
	},
	url: {
		type: 'string',
		default: '',
	},
	target: {
		type: 'string',
		default: '_self',
	},
	btnBackgroundColor: {
		type: 'string',
	},
	btnTextColor: {
		type: 'string',
	},
	imageID: {
		type: 'number',
		default: 0,
	},
	imageURL: {
		type: 'string',
		source: 'attribute',
		selector: '.smb-items__item__figure > img',
		attribute: 'src',
		default: '',
	},
};
