'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _components = {
	_$HeaderCell: {
		displayName: 'HeaderCell'
	}
};

function _wrapComponent(uniqueId) {
	return function (ReactClass) {
		return ReactClass;
	};
}

var HeaderCell = (function (_React$Component) {
	_inherits(HeaderCell, _React$Component);

	function HeaderCell() {
		_classCallCheck(this, _HeaderCell);

		_React$Component.apply(this, arguments);
	}

	HeaderCell.prototype.handleClick = function handleClick(e) {
		if (this.isSortable()) {
			this.props.onSort();
		}
	};

	HeaderCell.prototype.isSortable = function isSortable() {
		return this.props.onSort && (this.props.column.sortable || typeof this.props.column.sortable == 'undefined');
	};

	HeaderCell.prototype.render = function render() {
		var _this = this;

		var style = {};
		if (this.isSortable()) {
			style.cursor = 'pointer';
		}
		if (this.props.column.width) {
			style.width = this.props.column.width;
		}
		var className = '';
		if (this.isSortable()) {
			if (this.props.sort) {
				className = 'sorting_' + this.props.sort;
			} else {
				className = 'sorting';
			}
		}
		if (this.props.column.viewport) {
			className += ' vp-' + this.props.column.viewport;
		}
		return _react2['default'].createElement(
			'th',
			{ style: style, className: className, onClick: function (e) {
					return _this.handleClick(e);
				} },
			this.props.column.title
		);
	};

	_createClass(HeaderCell, null, [{
		key: 'propTypes',
		value: {
			/**
    * Column definition
    */
			column: _react2['default'].PropTypes.object.isRequired,
			/**
    * Sort direction
    */
			sort: _react2['default'].PropTypes.oneOf(['asc', 'desc']),
			/**
    * Sort event
    */
			onSort: _react2['default'].PropTypes.func
		},
		enumerable: true
	}]);

	var _HeaderCell = HeaderCell;
	HeaderCell = _wrapComponent('_$HeaderCell')(HeaderCell) || HeaderCell;
	return HeaderCell;
})(_react2['default'].Component);

exports['default'] = HeaderCell;
module.exports = exports['default'];