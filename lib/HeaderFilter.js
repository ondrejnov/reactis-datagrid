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
	_$HeaderFilter: {
		displayName: 'HeaderFilter'
	}
};

function _wrapComponent(uniqueId) {
	return function (ReactClass) {
		return ReactClass;
	};
}

var HeaderFilter = (function (_Component) {
	_inherits(HeaderFilter, _Component);

	function HeaderFilter() {
		_classCallCheck(this, _HeaderFilter);

		_Component.apply(this, arguments);
	}

	HeaderFilter.prototype.handleSort = function handleSort(column) {
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

	HeaderFilter.prototype.handleToggleSelectAll = function handleToggleSelectAll(e) {
		var checked = e.target.checked;
		this.props.onSelectAll(checked);
	};

	HeaderFilter.prototype.render = function render() {
		var _this = this;

		var i = 0;
		var cells = this.props.columnModel.map(function (column) {
			var input = _this.props.filter.getControl(column.name);
			if (input && input.props.visible) {
				if (!input.props.visible()) {
					input = false;
				}
			}
			var className = '';
			if (column.viewport) {
				className = ' vp-' + column.viewport;
			}
			if (input) {
				i++;
			}
			return _react2['default'].createElement(
				'td',
				{ key: column.name, className: className },
				input
			);
		});
		var className = 'headerfilter';
		if (i == 0) {
			className += ' hide';
		}

		var expandable = false;
		if (this.props.expandable) {
			expandable = _react2['default'].createElement('th', null);
		}

		return _react2['default'].createElement(
			'tr',
			{ className: className },
			this.props.multiAction && _react2['default'].createElement(
				'td',
				{ style: { width: '24px', textAlign: 'center' } },
				_react2['default'].createElement('input', { type: 'checkbox', checked: this.props.selectedAll, onChange: function (e) {
						return _this.handleToggleSelectAll(e);
					} })
			),
			expandable,
			cells
		);
	};

	_createClass(HeaderFilter, null, [{
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
    * is datagrid expandable
    */
			expandable: _react2['default'].PropTypes.bool.isRequired,
			/**
    * Sort event
    */
			onSort: _react2['default'].PropTypes.func,
			/**
    * SelectAll event
    */
			onSelectAll: _react2['default'].PropTypes.func
		},
		enumerable: true
	}]);

	var _HeaderFilter = HeaderFilter;
	HeaderFilter = _wrapComponent('_$HeaderFilter')(HeaderFilter) || HeaderFilter;
	return HeaderFilter;
})(_Component2['default']);

exports['default'] = HeaderFilter;
module.exports = exports['default'];