'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _components = {
	_$FilterField: {
		displayName: 'FilterField'
	}
};

function _wrapComponent(uniqueId) {
	return function (ReactClass) {
		return ReactClass;
	};
}

var FilterField = (function (_React$Component) {
	_inherits(FilterField, _React$Component);

	function FilterField() {
		_classCallCheck(this, _FilterField);

		_React$Component.apply(this, arguments);
	}

	FilterField.prototype.render = function render() {
		if (!this.props.filter) {
			return false;
		}
		return _react2['default'].createElement(
			'span',
			{ className: this.props.className, style: this.props.style },
			_react2['default'].createElement(
				'table',
				null,
				_react2['default'].createElement(
					'tbody',
					null,
					_react2['default'].createElement(
						'tr',
						null,
						this.props.label && _react2['default'].createElement(
							'td',
							{ style: { paddingRight: 5 } },
							this.props.label,
							':'
						),
						_react2['default'].createElement(
							'td',
							{ style: { width: this.props.width } },
							this.props.filter.getControl(this.props.field)
						)
					)
				)
			)
		);
	};

	var _FilterField = FilterField;
	FilterField = _wrapComponent('_$FilterField')(FilterField) || FilterField;
	return FilterField;
})(_react2['default'].Component);

exports['default'] = FilterField;
module.exports = exports['default'];