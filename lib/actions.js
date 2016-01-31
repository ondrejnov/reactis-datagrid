'use strict';

exports.__esModule = true;
exports.initDefault = initDefault;
exports.destroy = destroy;
exports.setPage = setPage;
exports.setSort = setSort;
exports.setFilter = setFilter;
exports.setFilterLive = setFilterLive;
exports.load = load;
exports.addSelectedRows = addSelectedRows;
exports.removeSelectedRows = removeSelectedRows;
exports.expandRows = expandRows;
exports.collapseRows = collapseRows;
var INIT_DEFAULT = 'datagrid/initDefault';
exports.INIT_DEFAULT = INIT_DEFAULT;
var DESTROY = 'datagrid/destroy';

exports.DESTROY = DESTROY;
var LOAD = 'datagrid/LOAD';
exports.LOAD = LOAD;
var LOAD_SUCCESS = 'datagrid/LOAD_SUCCESS';
exports.LOAD_SUCCESS = LOAD_SUCCESS;
var LOAD_FAIL = 'datagrid/LOAD_FAIL';

exports.LOAD_FAIL = LOAD_FAIL;
var SET_PAGE = 'datagrid/setPage';
exports.SET_PAGE = SET_PAGE;
var SET_SORT = 'datagrid/setSort';
exports.SET_SORT = SET_SORT;
var SET_FILTER = 'datagrid/setFilter';
exports.SET_FILTER = SET_FILTER;
var SET_FILTER_LIVE = 'datagrid/setFilterLive';

exports.SET_FILTER_LIVE = SET_FILTER_LIVE;
var ADD_SELECTED_ROWS = 'datagrid/AddSelectedRows';
exports.ADD_SELECTED_ROWS = ADD_SELECTED_ROWS;
var REMOVE_SELECTED_ROWS = 'datagrid/RemoveSelectedRows';

exports.REMOVE_SELECTED_ROWS = REMOVE_SELECTED_ROWS;
var EXPAND_ROWS = 'datagrid/ExpandRows';
exports.EXPAND_ROWS = EXPAND_ROWS;
var COLLAPSE_ROWS = 'datagrid/CollapseRows';

exports.COLLAPSE_ROWS = COLLAPSE_ROWS;

function initDefault(id, state) {
	return {
		type: INIT_DEFAULT,
		id: id,
		state: state
	};
}

function destroy(id) {
	return {
		type: DESTROY,
		id: id
	};
}

function setPage(id, page) {
	return {
		type: SET_PAGE,
		id: id,
		page: page
	};
}

function setSort(id, sort) {
	return {
		type: SET_SORT,
		id: id,
		sort: sort
	};
}

function setFilter(id, value) {
	return {
		type: SET_FILTER,
		id: id,
		value: value
	};
}

function setFilterLive(id, value) {
	return {
		type: SET_FILTER_LIVE,
		id: id,
		value: value
	};
}

function load(id, api, dgState, limit) {
	var saveState = arguments.length <= 4 || arguments[4] === undefined ? false : arguments[4];

	return {
		types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
		id: id,
		promise: function promise(client) {
			return client.call(api, { qo: {
					page: dgState.page,
					sort: dgState.sort,
					limit: limit,
					filter: dgState.filter
				}, save: saveState });
		}
	};
}

function addSelectedRows(id, ids) {
	return {
		type: ADD_SELECTED_ROWS,
		id: id,
		ids: ids
	};
}

function removeSelectedRows(id, ids) {
	return {
		type: REMOVE_SELECTED_ROWS,
		id: id,
		ids: ids
	};
}

function expandRows(id, ids) {
	return {
		type: EXPAND_ROWS,
		id: id,
		ids: ids
	};
}

function collapseRows(id, ids) {
	return {
		type: COLLAPSE_ROWS,
		id: id,
		ids: ids
	};
}