export const INIT_DEFAULT = 'datagrid/initDefault';
export const DESTROY = 'datagrid/destroy';

export const LOAD = 'datagrid/LOAD';
export const LOAD_SUCCESS = 'datagrid/LOAD_SUCCESS';
export const LOAD_FAIL = 'datagrid/LOAD_FAIL';

export const SET_PAGE = 'datagrid/setPage';
export const SET_SORT = 'datagrid/setSort';
export const SET_FILTER = 'datagrid/setFilter';
export const SET_FILTER_LIVE = 'datagrid/setFilterLive';

export const ADD_SELECTED_ROWS = 'datagrid/AddSelectedRows';
export const REMOVE_SELECTED_ROWS = 'datagrid/RemoveSelectedRows';
export const SELECTED_MOVE = 'datagrid/SelectedMove';

export const EXPAND_ROWS = 'datagrid/ExpandRows';
export const COLLAPSE_ROWS = 'datagrid/CollapseRows';

export const SAVE_INLINE = 'datagrid/SAVE_INLINE';
export const SAVE_INLINE_SUCCESS = 'datagrid/SAVE_INLINE_SUCCESS';
export const SAVE_INLINE_FAIL = 'datagrid/SAVE_INLINE_FAIL';

export const SET_INLINE = 'datagrid/SET_INLINE';

export function initDefault(id, state) {
	return {
		type: INIT_DEFAULT,
		id,
		state
	};
}

export function destroy(id) {
	return {
		type: DESTROY,
		id
	};
}

export function setPage(id, page) {
	return {
		type: SET_PAGE,
		id,
		page
	}
}

export function setSort(id, sort) {
	return {
		type: SET_SORT,
		id,
		sort
	};
}

export function setFilter(id, value) {
	return {
		type: SET_FILTER,
		id,
		value
	};
}

export function setFilterLive(id, value) {
	return {
		type: SET_FILTER_LIVE,
		id,
		value
	};
}

export function load(id, api, dgState, limit, saveState = false) {
	return {
		types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
		id,
		promise: (client) => client.call(api, {qo: {
			page: dgState.page,
			sort: dgState.sort,
			limit: limit,
			filter: dgState.filter
		}, save: saveState})
	};
}

export function addSelectedRows(id, ids, append = true) {
	return {
		type: ADD_SELECTED_ROWS,
		append,
		id,
		ids
	};
}

export function selectedMove(id, offset) {
	return {
		type: SELECTED_MOVE,
		id,
		offset
	};
}

export function removeSelectedRows(id, ids) {
	return {
		type: REMOVE_SELECTED_ROWS,
		id,
		ids
	};
}

export function expandRows(id, ids) {
	return {
		type: EXPAND_ROWS,
		id,
		ids
	};
}

export function collapseRows(id, ids) {
	return {
		type: COLLAPSE_ROWS,
		id,
		ids
	};
}

export function saveInline(id, apiMethod, field, args, cellValue) {
	return {
		types: [SAVE_INLINE, SAVE_INLINE_SUCCESS, SAVE_INLINE_FAIL],
		id,
		field: field,
		primaryKey: args.id,
		value: cellValue ? cellValue : args.value,
		promise: (client) => client.call(apiMethod, args)
	};
}

export function setInline(id, field, args, cellValue) {
	return {
		type: SET_INLINE,
		id,
		field: field,
		primaryKey: args.id,
		value: cellValue ? cellValue : args.value
	};
}