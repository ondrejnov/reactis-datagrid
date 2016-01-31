'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _paginatorMath = require('./paginatorMath');

var _paginatorMath2 = _interopRequireDefault(_paginatorMath);

var _components = {
	_$Paginator: {
		displayName: 'Paginator'
	}
};

function _wrapComponent(uniqueId) {
	return function (ReactClass) {
		return ReactClass;
	};
}

var Paginator = (function (_React$Component) {
	_inherits(Paginator, _React$Component);

	function Paginator() {
		_classCallCheck(this, _Paginator);

		_React$Component.apply(this, arguments);
	}

	Paginator.prototype.handlePage = function handlePage(page, ev) {
		ev.preventDefault();
		if (this.props.onPage) {
			this.props.onPage(page);
		}
	};

	Paginator.prototype.render = function render() {
		if (!this.props.count || !this.props.limit || !this.props.page) {
			return false;
		}

		var paginator = new _paginatorMath2['default'](this.props.page, this.props.limit, this.props.count, this.props.steps, this.props.surround);
		var steps = paginator.getSteps();
		var items = [];
		var prevStep = null;
		for (var i = 0; i < steps.length; i++) {
			var j = steps[i];
			if (prevStep && j - prevStep > 1) {
				items.push(_react2['default'].createElement(
					'li',
					{ key: -i, className: 'dots' },
					'...'
				));
			}
			var cn = '';
			if (this.props.page == j) {
				cn = 'active';
			}
			items.push(_react2['default'].createElement(
				'li',
				{ key: j, onClick: this.handlePage.bind(this, j), className: cn },
				_react2['default'].createElement(
					'a',
					{ href: '#' },
					j
				)
			));
			prevStep = j;
		}

		var prev = ''; //<li className={cn} onClick={this.handlePage.bind(this, info.previous_page)}><a href="#"><i className="icon-double-angle-left"></i> </a></li>;
		var next = ''; //<li className={cn} onClick={this.handlePage.bind(this, info.next_page)}><a href="#"> <i className="icon-double-angle-right"></i></a></li>;

		return _react2['default'].createElement(
			'ul',
			{ className: 'pagination' },
			prev,
			' ',
			items,
			' ',
			next
		);
	};

	_createClass(Paginator, null, [{
		key: 'propTypes',
		value: {
			/**
    * Actual page
    */
			page: _react2['default'].PropTypes.number,
			/**
    * Rows per page
    */
			limit: _react2['default'].PropTypes.number,
			/**
    * Total rows
    */
			count: _react2['default'].PropTypes.number,
			/**
    * Number of buttons
    */
			steps: _react2['default'].PropTypes.number,
			/**
    * Page select event
    */
			onPage: _react2['default'].PropTypes.func
		},
		enumerable: true
	}]);

	var _Paginator = Paginator;
	Paginator = _wrapComponent('_$Paginator')(Paginator) || Paginator;
	return Paginator;
})(_react2['default'].Component);

exports['default'] = Paginator;
module.exports = exports['default'];