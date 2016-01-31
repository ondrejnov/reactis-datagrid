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

var _components = {
	_$Loader: {
		displayName: 'Loader'
	}
};

function _wrapComponent(uniqueId) {
	return function (ReactClass) {
		return ReactClass;
	};
}

var Loader = (function (_Component) {
	_inherits(Loader, _Component);

	_createClass(Loader, null, [{
		key: 'propTypes',
		value: {
			visible: _react2['default'].PropTypes.bool
		},
		enumerable: true
	}, {
		key: 'defaultProps',
		value: {
			visible: false
		},
		enumerable: true
	}]);

	function Loader(props) {
		_classCallCheck(this, _Loader);

		_Component.call(this, props);
		this.state = { visible: props.visible };
	}

	Loader.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
		var _this = this;

		if (nextProps.visible && !this.props.visible) {
			this.timeout = setTimeout(function () {
				_this.setState({ visible: true });
			}, 300);
		} else {
			if (this.timeout) {
				clearTimeout(this.timeout);
			}
			this.state.visible = nextProps.visible;
		}
	};

	Loader.prototype.render = function render() {
		if (!this.state.visible) {
			return false;
		}

		return _react2['default'].createElement(
			'span',
			null,
			_react2['default'].createElement('div', { style: { background: '#E5E5E5', opacity: 0.35, position: 'absolute', top: 70, width: '100%', bottom: 0 } }),
			_react2['default'].createElement(
				'div',
				{ style: { position: 'absolute', top: '50%', left: '50%', width: 32, bottom: 0 } },
				_react2['default'].createElement('img', { src: '/img/ajax-loader.gif' })
			)
		);
	};

	var _Loader = Loader;
	Loader = _wrapComponent('_$Loader')(Loader) || Loader;
	return Loader;
})(_Component2['default']);

exports['default'] = Loader;
module.exports = exports['default'];