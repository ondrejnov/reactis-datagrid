'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _immutable = require('immutable');

var _components = {
	_$Cell: {
		displayName: 'Cell'
	}
};

function _wrapComponent(uniqueId) {
	return function (ReactClass) {
		return ReactClass;
	};
}

var Cell = (function (_React$Component) {
	_inherits(Cell, _React$Component);

	function Cell() {
		_classCallCheck(this, _Cell);

		_React$Component.apply(this, arguments);
	}

	Cell.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {

		var shouldUpdate = this.props.value != nextProps.value || this.props.row != nextProps.row && this.props.column.renderer;

		return !!shouldUpdate;
	};

	Cell.prototype.render = function render() {

		var value = this.props.value;
		if (this.props.column.renderer && this.props.column.renderer instanceof Function) {
			value = this.props.column.renderer(value && value.toJS ? value.toJS() : value, this.props.row.toJS(), this.props.column);
		}
		if (value && this.props.column.suffix && value.toString().length > 0) {
			value = _react2['default'].createElement(
				'span',
				null,
				value,
				this.props.column.suffix
			);
		}

		var style = {};
		if (this.props.column.style) {
			style = this.props.column.style;
		}
		if (this.props.column.align) {
			style.textAlign = this.props.column.align;
		}

		var className = undefined;
		if (this.props.column.viewport) {
			className = 'vp-' + this.props.column.viewport;
		}
		return _react2['default'].createElement(
			'td',
			{ style: style, className: className },
			value
		);
	};

	_createClass(Cell, null, [{
		key: 'propTypes',
		value: {
			/**
    * Column definition
    */
			column: _react2['default'].PropTypes.object.isRequired,
			/**
    * Cell value
    */
			value: _react2['default'].PropTypes.any,
			/**
    * Row data. Use for renderer.
    */
			row: _react2['default'].PropTypes.instanceOf(_immutable.Map)
		},
		enumerable: true
	}]);

	var _Cell = Cell;
	Cell = _wrapComponent('_$Cell')(Cell) || Cell;
	return Cell;
})(_react2['default'].Component);

exports['default'] = Cell;
module.exports = exports['default'];