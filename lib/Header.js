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

var _HeaderCell = require('./HeaderCell');

var _HeaderCell2 = _interopRequireDefault(_HeaderCell);

var _components = {
	_$Header: {
		displayName: 'Header'
	}
};

function _wrapComponent(uniqueId) {
	return function (ReactClass) {
		return ReactClass;
	};
}

var Header = (function (_Component) {
	_inherits(Header, _Component);

	function Header() {
		_classCallCheck(this, _Header);

		_Component.apply(this, arguments);
	}

	Header.prototype.handleSort = function handleSort(column) {
		var sort = undefined;
		// change
		if (this.props.sortBy && this.props.sortBy.column == column.name) {
			sort = this.props.sortBy;
			if (sort.direction == 'desc') {
				sort.direction = 'asc';
			} else {
				sort.direction = 'desc';
			}
		}
		// new
		else {
				sort = {
					column: column.name,
					direction: 'asc'
				};
			}
		this.props.onSort(sort);
	};

	Header.prototype.handleToggleSelectAll = function handleToggleSelectAll(e) {
		var checked = e.target.checked;
		this.props.onSelectAll(checked);
	};

	Header.prototype.render = function render() {
		var _this = this;

		var cells = this.props.columnModel.map(function (column) {
			var sort = undefined;
			if (_this.props.sortBy && _this.props.sortBy.column == column.name) {
				sort = _this.props.sortBy.direction;
			}
			return _react2['default'].createElement(_HeaderCell2['default'], {
				key: column.name,
				column: column,
				onSort: function () {
					return _this.handleSort(column);
				},
				sort: sort
			});
		});

		var expandable = false;
		if (this.props.expandable) {
			expandable = _react2['default'].createElement('th', { style: { width: 29 } });
		}
		var checkbox = _react2['default'].createElement('input', { type: 'checkbox', checked: this.props.selectedAll, onChange: function (e) {
				return _this.handleToggleSelectAll(e);
			} });
		return _react2['default'].createElement(
			'tr',
			{ className: 'header' },
			this.props.multiAction && _react2['default'].createElement('th', { style: { width: 28, textAlign: 'center' } }),
			expandable,
			cells
		);
	};

	_createClass(Header, null, [{
		key: 'propTypes',
		value: {
			/**
    * Columns definition
    */
			columnModel: _react2['default'].PropTypes.array.isRequired,
			/**
    * Sorted column
    */
			sortBy: _react2['default'].PropTypes.object,
			/*
   * Has multiaction checkbox
   */
			multiAction: _react2['default'].PropTypes.bool,
			/**
    * Sort event
    */
			onSort: _react2['default'].PropTypes.func,
			/**
    * is datagrid expandable
    */
			expandable: _react2['default'].PropTypes.bool.isRequired,
			/**
    * SelectAll event
    */
			onSelectAll: _react2['default'].PropTypes.func
		},
		enumerable: true
	}]);

	var _Header = Header;
	Header = _wrapComponent('_$Header')(Header) || Header;
	return Header;
})(_Component2['default']);

exports['default'] = Header;
module.exports = exports['default'];