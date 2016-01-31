'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;
exports['default'] = reducer;

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _actions = require('./actions');

var initialState = _immutable2['default'].Map();

function reducer() {
	var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
	var action = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	switch (action.type) {
		case _actions.INIT_DEFAULT:
			return state.set(action.id, _immutable2['default'].fromJS(action.state));

		case _actions.DESTROY:
			return state['delete'](action.id);

		case _actions.LOAD:
			return state.setIn([action.id, 'pending'], true);

		case _actions.LOAD_SUCCESS:
			return state.setIn([action.id, 'pending'], false).setIn([action.id, 'count'], action.result.count).setIn([action.id, 'items'], _immutable2['default'].fromJS(action.result.items)).setIn([action.id, 'summary'], _immutable2['default'].fromJS(action.result.summary));

		case _actions.SET_PAGE:
			return state.setIn([action.id, 'page'], action.page);

		case _actions.SET_SORT:
			return state.setIn([action.id, 'sort'], _immutable2['default'].fromJS(action.sort));

		case _actions.SET_FILTER:
			return state.setIn([action.id, 'page'], 1).setIn([action.id, '_filter'], action.value).setIn([action.id, 'filter'], action.value);

		case _actions.SET_FILTER_LIVE:
			return state.setIn([action.id, '_filter'], action.value);

		case _actions.ADD_SELECTED_ROWS:
			var selected = state.getIn([action.id, 'selected']);
			if (!selected) {
				selected = _immutable2['default'].List();
			}
			action.ids.forEach(function (id) {
				if (selected.indexOf(id) == -1) {
					selected = selected.push(id);
				}
			});
			return state.setIn([action.id, 'selected'], selected);

		case _actions.REMOVE_SELECTED_ROWS:
			var selected = state.getIn([action.id, 'selected']);
			if (!selected) {
				selected = _immutable2['default'].List();
			}
			action.ids.forEach(function (id) {
				var i = selected.indexOf(id);
				if (i != -1) {
					selected = selected.splice(i, 1);
				}
			});
			return state.setIn([action.id, 'selected'], selected);

		case _actions.EXPAND_ROWS:
			var list = state.getIn([action.id, 'expanded']);
			if (!list) {
				list = _immutable2['default'].List();
			}
			action.ids.forEach(function (id) {
				if (list.indexOf(id) == -1) {
					list = list.push(id);
				}
			});
			return state.setIn([action.id, 'expanded'], list);

		case _actions.COLLAPSE_ROWS:
			var list = state.getIn([action.id, 'expanded']);
			if (!list) {
				list = _immutable2['default'].List();
			}
			action.ids.forEach(function (id) {
				var i = list.indexOf(id);
				if (i != -1) {
					list = list.splice(i, 1);
				}
			});
			return state.setIn([action.id, 'expanded'], list);

		default:
			return state;
	}
}

module.exports = exports['default'];