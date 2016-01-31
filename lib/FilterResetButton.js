'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _Component = require('./Component');

var _Component2 = _interopRequireDefault(_Component);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsCssTransitionGroup = require('react-addons-css-transition-group');

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

var _components = {
	_$FilterResetButton: {
		displayName: 'FilterResetButton'
	}
};

function _wrapComponent(uniqueId) {
	return function (ReactClass) {
		return ReactClass;
	};
}

var FilterResetButton = (function (_Component) {
	_inherits(FilterResetButton, _Component);

	function FilterResetButton() {
		_classCallCheck(this, _FilterResetButton);

		_Component.apply(this, arguments);
	}

	FilterResetButton.prototype.handleClick = function handleClick(e) {
		e.preventDefault();
		this.props.onClick(e);
	};

	FilterResetButton.prototype.render = function render() {
		var _this = this;

		return _react2['default'].createElement(
			_reactAddonsCssTransitionGroup2['default'],
			{ transitionName: 'example', transitionAppear: true, transitionAppearTimeout: 300, transitionEnterTimeout: 300, transitionLeaveTimeout: 300 },
			_react2['default'].createElement(
				'a',
				{ href: '', title: this.props.alt, onClick: function (e) {
						return _this.handleClick(e);
					}, style: { textAlign: 'center', color: '#888' } },
				_react2['default'].createElement('i', { style: { fontSize: 10, color: '#AAA' }, className: 'icon-cross' }),
				' ',
				this.props.text
			)
		);
	};

	_createClass(FilterResetButton, null, [{
		key: 'defaultProps',
		value: {
			alt: 'Vynulovat filtr',
			text: 'filtr'
		},
		enumerable: true
	}]);

	var _FilterResetButton = FilterResetButton;
	FilterResetButton = _wrapComponent('_$FilterResetButton')(FilterResetButton) || FilterResetButton;
	return FilterResetButton;
})(_Component2['default']);

exports['default'] = FilterResetButton;
module.exports = exports['default'];