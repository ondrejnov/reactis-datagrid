'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _interopRequireWildcard = require('babel-runtime/helpers/interop-require-wildcard')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Datagrid = require('./Datagrid');

var _Datagrid2 = _interopRequireDefault(_Datagrid);

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _reactRedux = require('react-redux');

var _actions = require('./actions');

var actions = _interopRequireWildcard(_actions);

var _redux = require('redux');

var _FilterField = require('./FilterField');

var _FilterField2 = _interopRequireDefault(_FilterField);

var _reactPureRenderShallowEqual = require('react-pure-render/shallowEqual');

var _reactPureRenderShallowEqual2 = _interopRequireDefault(_reactPureRenderShallowEqual);

var _components = {
	_$ReduxDatagrid: {
		displayName: 'ReduxDatagrid'
	}
};

function _wrapComponent(uniqueId) {
	return function (ReactClass) {
		return ReactClass;
	};
}

var ReduxDatagrid = (function (_React$Component) {
	_inherits(ReduxDatagrid, _React$Component);

	_createClass(ReduxDatagrid, null, [{
		key: 'propTypes',
		value: {
			id: _react2['default'].PropTypes.any.isRequired,
			columnModel: _react2['default'].PropTypes.array.isRequired,
			state: _react2['default'].PropTypes.object,
			filter: _react2['default'].PropTypes.object,
			defaultFilter: _react2['default'].PropTypes.object,
			api: _react2['default'].PropTypes.string.isRequired,
			defaultSort: _react2['default'].PropTypes.object,
			multiActions: _react2['default'].PropTypes.array,
			getRowClassName: _react2['default'].PropTypes.func,
			limit: _react2['default'].PropTypes.number.isRequired,
			compact: _react2['default'].PropTypes.bool,
			expandableComponent: _react2['default'].PropTypes.func,
			fixedFilter: _react2['default'].PropTypes.object,
			className: _react2['default'].PropTypes.string
		},
		enumerable: true
	}, {
		key: 'defaultProps',
		value: {
			limit: 25,
			defaultFilter: {}
		},
		enumerable: true
	}]);

	function ReduxDatagrid(props) {
		_classCallCheck(this, _ReduxDatagrid);

		_React$Component.call(this, props);
		this.filter = this.props.filter;
		if (this.props.filter) {
			this.filter.on('change', this.handleFilterChange, this);
		}
	}

	ReduxDatagrid.prototype.componentDidMount = function componentDidMount() {

		if (!this.props.state || this.props.forceFilter) {
			var defaultState = {
				items: [],
				filter: this.props.defaultFilter,
				page: 1,
				count: 0,
				summary: {},
				sort: this.props.defaultSort
			};
			if (this.filter) {
				this.filter.setValues(_immutable2['default'].fromJS(this.props.defaultFilter));
			}
			this.props.actions.initDefault(this.props.id, defaultState);
		} else {
			if (this.filter) {
				this.filter.setValues(this.props.state.get('filter'));
			}
			this.load();
		}
	};

	ReduxDatagrid.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
		if (this.props.state && this.props.state.get('_filter') != nextProps.state.get('_filter') && nextProps.state.get('_filter')) {
			this.filter.setValues(nextProps.state.get('_filter'));
		}

		if (!this.props.state && nextProps.state || this.props.state.get('page') != nextProps.state.get('page') || this.props.state.get('filter') != nextProps.state.get('filter') || this.props.state.get('sort') != nextProps.state.get('sort') || !_reactPureRenderShallowEqual2['default'](this.props.fixedFilter, nextProps.fixedFilter)) {
			this.load(nextProps.state, nextProps.fixedFilter);
		}
	};

	ReduxDatagrid.prototype.componentWillUnmount = function componentWillUnmount() {
		if (this.props.filter) {
			this.props.filter.removeListener('change', this.handleFilterChange, this);
		}
	};

	ReduxDatagrid.prototype.handleFilterChange = function handleFilterChange(key, value, values) {
		var _this = this;

		this.props.actions.setFilterLive(this.props.id, values);
		var delay = this.props.filter.schema[key] && this.props.filter.schema[key]['class'].filterDelay;
		if (this.filterTimeout) {
			clearTimeout(this.filterTimeout);
		}
		if (delay && value !== null) {
			this.filterTimeout = setTimeout(function () {
				_this.props.actions.setFilter(_this.props.id, values);
			}, 333);
		} else {
			this.props.actions.setFilter(this.props.id, values);
		}
	};

	ReduxDatagrid.prototype.refresh = function refresh() {
		this.load();
	};

	ReduxDatagrid.prototype.load = function load() {
		var state = arguments.length <= 0 || arguments[0] === undefined ? this.props.state : arguments[0];
		var fixedFilter = arguments.length <= 1 || arguments[1] === undefined ? this.props.fixedFilter : arguments[1];

		var s = state.toJS();
		s.filter = _extends({}, s.filter, fixedFilter);
		this.props.actions.load(this.props.id, this.props.api, s, this.props.limit, this.props.saveState);
	};

	ReduxDatagrid.prototype.render = function render() {
		var _this2 = this;

		if (!this.props.state) {
			return null;
		}
		return _react2['default'].createElement(_Datagrid2['default'], {
			columnModel: this.props.columnModel,
			multiActions: this.props.multiActions,
			rows: this.props.state.get('items'),
			page: this.props.state.get('page'),
			sort: this.props.state.get('sort'),
			filter: this.filter,
			summary: this.props.state.get('summary'),
			selected: this.props.state.get('selected'),
			totalCount: this.props.state.get('count'),
			pending: !!this.props.state.get('pending'),
			getRowClassName: this.props.getRowClassName,
			limit: this.props.limit,
			className: this.props.className,
			compact: this.props.compact,
			expanded: this.props.state.get('expanded'),
			expandableComponent: this.props.expandableComponent,
			onPage: function (page) {
				return _this2.props.actions.setPage(_this2.props.id, page);
			},
			onSort: function (sort) {
				return _this2.props.actions.setSort(_this2.props.id, sort);
			},
			onSelect: function (ids) {
				return _this2.props.actions.addSelectedRows(_this2.props.id, ids);
			},
			onUnSelect: function (ids) {
				return _this2.props.actions.removeSelectedRows(_this2.props.id, ids);
			},
			onExpand: function (ids) {
				return _this2.props.actions.expandRows(_this2.props.id, ids);
			},
			onCollapse: function (ids) {
				return _this2.props.actions.collapseRows(_this2.props.id, ids);
			}
		});
	};

	var _ReduxDatagrid = ReduxDatagrid;
	ReduxDatagrid = _wrapComponent('_$ReduxDatagrid')(ReduxDatagrid) || ReduxDatagrid;
	ReduxDatagrid = _reactRedux.connect(function (state, ownProps) {
		return {
			state: state.datagrids.get(ownProps.id)
		};
	}, function (dispatch) {
		return { actions: _redux.bindActionCreators(actions, dispatch) };
	}, null, { withRef: true })(ReduxDatagrid) || ReduxDatagrid;
	return ReduxDatagrid;
})(_react2['default'].Component);

exports['default'] = ReduxDatagrid;
module.exports = exports['default'];