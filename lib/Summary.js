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

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _components = {
	_$Summary: {
		displayName: 'Summary'
	}
};

function _wrapComponent(uniqueId) {
	return function (ReactClass) {
		return ReactClass;
	};
}

var Summary = (function (_Component) {
	_inherits(Summary, _Component);

	function Summary() {
		_classCallCheck(this, _Summary);

		_Component.apply(this, arguments);
	}

	Summary.prototype.isEmpty = function isEmpty() {
		var _this = this;

		var has = false;
		this.props.columnModel.forEach(function (column) {
			if (_this.props.data && _this.props.data.get(column.name)) {
				has = true;
			}
		});
		return !has;
	};

	Summary.prototype.render = function render() {
		var _this2 = this;

		if (this.isEmpty()) {
			return _react2['default'].createElement('tfoot', null);
		}

		var cells = this.props.columnModel.map(function (column) {
			var style = {};
			if (column.style) {
				style = column.style;
			}
			if (column.align) {
				style.textAlign = column.align;
			}
			var className = undefined;
			if (column.viewport) {
				className = 'vp-' + column.viewport;
			}
			var value = undefined;
			if (_this2.props.data.get(column.name) != null) {
				value = _this2.props.data.get(column.name);
			}
			return _react2['default'].createElement(
				'td',
				{ key: column.name, style: style, className: className },
				value
			);
		});

		return _react2['default'].createElement(
			'tfoot',
			null,
			_react2['default'].createElement(
				'tr',
				null,
				this.props.expandable && _react2['default'].createElement('td', null),
				this.props.multiAction && _react2['default'].createElement('td', null),
				cells
			)
		);
	};

	_createClass(Summary, null, [{
		key: 'propTypes',
		value: {
			/**
    * Columns definition
    */
			columnModel: _react2['default'].PropTypes.array.isRequired,
			/**
    * Row data
    */
			data: _react2['default'].PropTypes.instanceOf(_immutable2['default'].Map),
			/*
    * Has multiactions
    */
			multiAction: _react2['default'].PropTypes.bool,
			/**
    * Expandable datagrid
    */
			expandable: _react2['default'].PropTypes.bool
		},
		enumerable: true
	}]);

	var _Summary = Summary;
	Summary = _wrapComponent('_$Summary')(Summary) || Summary;
	return Summary;
})(_Component2['default']);

exports['default'] = Summary;
module.exports = exports['default'];