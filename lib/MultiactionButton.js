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

var _reactBootstrap = require('react-bootstrap');

var _immutable = require('immutable');

var _components = {
	_$MultiActionButton: {
		displayName: 'MultiActionButton'
	}
};

function _wrapComponent(uniqueId) {
	return function (ReactClass) {
		return ReactClass;
	};
}

var MultiActionButton = (function (_Component) {
	_inherits(MultiActionButton, _Component);

	function MultiActionButton() {
		_classCallCheck(this, _MultiActionButton);

		_Component.apply(this, arguments);
	}

	MultiActionButton.prototype.getCountSelected = function getCountSelected() {
		if (this.props.selected.count()) {
			return this.props.selected.count();
		} else {
			return this.props.totalCount;
		}
	};

	MultiActionButton.prototype.handleMultiActionClick = function handleMultiActionClick(multiActionItem) {
		this.props.onActionSelect(multiActionItem);
		/*var action = {
  	count: this.getCountSelected(),
  	ids: this.props.selected.count() ? this.props.selected : null,
  	queryObject: this.props.queryObject
  };
  handler(action);*/
	};

	MultiActionButton.prototype.render = function render() {
		var _this = this;

		var selTitle;
		if (this.props.selected.count()) {
			selTitle = 'Akce s vybranými';
		} else {
			selTitle = 'Akce s vyfiltrovanými';
		}
		selTitle += ' (' + this.getCountSelected() + ')';
		var items = this.props.actions.map(function (item, index) {
			var el;
			if (item.divider) {
				el = _react2['default'].createElement(_reactBootstrap.MenuItem, { key: index, divider: true });
			} else {
				el = _react2['default'].createElement(
					_reactBootstrap.MenuItem,
					{ key: item.title, onSelect: function () {
							return _this.handleMultiActionClick(item);
						} },
					item.title
				);
			}
			return el;
		});

		return _react2['default'].createElement(
			'div',
			{ className: 'multiaction' },
			_react2['default'].createElement(
				_reactBootstrap.DropdownButton,
				{ id: 'multiaction', dropup: true, title: selTitle },
				items
			)
		);
	};

	_createClass(MultiActionButton, null, [{
		key: 'propTypes',
		value: {
			/**
    * Selected rows
    */
			selected: _react2['default'].PropTypes.instanceOf(_immutable.List),
			/*
    * Total count
    */
			totalCount: _react2['default'].PropTypes.number,
			/**
    * Multi action list
    */
			actions: _react2['default'].PropTypes.array,
			/**
    * Select event
    */
			onActionSelect: _react2['default'].PropTypes.func
		},
		enumerable: true
	}]);

	var _MultiActionButton = MultiActionButton;
	MultiActionButton = _wrapComponent('_$MultiActionButton')(MultiActionButton) || MultiActionButton;
	return MultiActionButton;
})(_Component2['default']);

exports['default'] = MultiActionButton;
module.exports = exports['default'];