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
	_$RowDetail: {
		displayName: 'RowDetail'
	}
};

function _wrapComponent(uniqueId) {
	return function (ReactClass) {
		return ReactClass;
	};
}

var RowDetail = (function (_React$Component) {
	_inherits(RowDetail, _React$Component);

	function RowDetail() {
		_classCallCheck(this, _RowDetail);

		_React$Component.apply(this, arguments);
	}

	RowDetail.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
		return this.props.data != nextProps.data || this.props.multiAction != nextProps.multiAction || this.props.selected != nextProps.selected || this.props.visible != nextProps.visible;
	};

	RowDetail.prototype.render = function render() {
		//		value: this.props.data.get(column.field)
		var cn = this.props.className;
		if (this.props.selected) {
			cn += ' selected';
		}
		if (!this.props.visible) {
			cn += ' hide';
		}
		var checkCell = false;
		if (this.props.multiAction) {
			checkCell = _react2['default'].createElement('td', { className: 'ch' });
		}
		var factory = new _react2['default'].createFactory(this.props.expandableComponent);
		var component = new factory({ data: this.props.data });
		return _react2['default'].createElement(
			'tr',
			{ className: cn },
			_react2['default'].createElement(
				'td',
				null,
				' '
			),
			_react2['default'].createElement(
				'td',
				{ colSpan: this.props.columnModel.length + 1 },
				component
			)
		);
	};

	_createClass(RowDetail, null, [{
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
    * Is selected row
    */
			selected: _react2['default'].PropTypes.bool,
			/**
    * Is expanded and visible
    */
			visible: _react2['default'].PropTypes.bool.isRequired,
			/**
    * Class of expandable component
    */
			expandableComponent: _react2['default'].PropTypes.func.isRequired,
			/*
    * Multiactions
    */
			multiAction: _react2['default'].PropTypes.any
		},
		enumerable: true
	}]);

	var _RowDetail = RowDetail;
	RowDetail = _wrapComponent('_$RowDetail')(RowDetail) || RowDetail;
	return RowDetail;
})(_react2['default'].Component);

exports['default'] = RowDetail;
module.exports = exports['default'];