'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _Cell = require('./Cell');

var _Cell2 = _interopRequireDefault(_Cell);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _immutable = require('immutable');

var _components = {
	_$Row: {
		displayName: 'Row'
	}
};

function _wrapComponent(uniqueId) {
	return function (ReactClass) {
		return ReactClass;
	};
}

var Row = (function (_React$Component) {
	_inherits(Row, _React$Component);

	function Row() {
		_classCallCheck(this, _Row);

		_React$Component.apply(this, arguments);
	}

	Row.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {

		var shouldUpdate = this.props.data != nextProps.data || this.props.multiAction != nextProps.multiAction || this.props.selected != nextProps.selected || this.props.expanded != nextProps.expanded;

		return shouldUpdate;
	};

	Row.prototype.handleToggleSelect = function handleToggleSelect(ev) {
		if (this.props.onSelect) {
			this.props.onSelect(this.props.data, ev.target.checked);
		}
	};

	Row.prototype.render = function render() {
		var _this = this;

		var cells = this.props.columnModel.map(function (column) {
			var factory = column.factory;
			if (!factory) {
				factory = new _react2['default'].createFactory(_Cell2['default']);
			}
			return new factory({
				key: column.name,
				column: column,
				row: _this.props.data,
				value: _this.props.data.get(column.field)
			});
		});

		var cn = this.props.className;
		if (this.props.selected) {
			cn += ' selected';
		}
		var checkCell = false;
		if (this.props.multiAction) {
			checkCell = _react2['default'].createElement(
				'td',
				{ className: 'ch' },
				_react2['default'].createElement('input', { type: 'checkbox', checked: this.props.selected, onChange: function (e) {
						return _this.handleToggleSelect(e);
					} })
			);
		}
		var expandable = false;
		if (this.props.expandable) {
			var cnex = false;
			if (this.props.expanded === true) {
				cnex = 'fa fa-caret-down';
			}
			if (this.props.expanded === false) {
				cnex = 'fa fa-caret-right';
			}
			expandable = _react2['default'].createElement(
				'td',
				{ style: { textAlign: 'center', cursor: 'pointer' },
					onClick: function () {
						return _this.props.onExpand(_this.props.data, !_this.props.expanded);
					} },
				cnex && _react2['default'].createElement('span', { className: cnex })
			);
		}
		return _react2['default'].createElement(
			'tr',
			{ className: cn },
			checkCell,
			expandable,
			cells
		);
	};

	_createClass(Row, null, [{
		key: 'propTypes',
		value: {
			/**
    * Columns definition
    */
			columnModel: _react2['default'].PropTypes.array.isRequired,
			/**
    * Columns definition
    */
			id: _react2['default'].PropTypes.any,
			/**
    * Row data
    */
			data: _react2['default'].PropTypes.instanceOf(_immutable.Map),
			/**
    * Row className
    */
			className: _react2['default'].PropTypes.string,
			/**
    * is selected row
    */
			selected: _react2['default'].PropTypes.bool.isRequired,
			/**
    * is row expandable
    */
			expandable: _react2['default'].PropTypes.bool.isRequired,
			/**
    * Select row event
    */
			onSelect: _react2['default'].PropTypes.func,
			/**
    * Expand/Collapse row event
    */
			onExpand: _react2['default'].PropTypes.func,
			/*
    * Multiactions
    */
			multiAction: _react2['default'].PropTypes.any
		},
		enumerable: true
	}]);

	var _Row = Row;
	Row = _wrapComponent('_$Row')(Row) || Row;
	return Row;
})(_react2['default'].Component);

exports['default'] = Row;
module.exports = exports['default'];