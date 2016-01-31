import immutable from 'immutable';
import {INIT_DEFAULT, DESTROY,
	LOAD, LOAD_SUCCESS,
	SET_PAGE, SET_SORT, SET_FILTER, SET_FILTER_LIVE,
	ADD_SELECTED_ROWS, REMOVE_SELECTED_ROWS,
	EXPAND_ROWS, COLLAPSE_ROWS,
	SAVE_INLINE, SAVE_INLINE_SUCCESS, SAVE_INLINE_FAIL
} from './actions';

const initialState = immutable.Map();

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
	  case INIT_DEFAULT:
		  return state.set(action.id, immutable.fromJS(action.state));

	  case DESTROY:
		  return state.delete(action.id);

	  case LOAD:
		  return state
			  		.setIn([action.id, 'pending'], true);

	  case LOAD_SUCCESS:
		  return state
			  		.setIn([action.id, 'pending'], false)
		  			.setIn([action.id, 'count'], action.result.count)
			  		.setIn([action.id, 'items'], immutable.fromJS(action.result.items))
			  		.setIn([action.id, 'summary'], immutable.fromJS(action.result.summary));

	  case SAVE_INLINE:
		  var inline = state.getIn([action.id, 'inline', action.field, action.primaryKey]);
		  if (!inline) {
			  inline = immutable.Map();
		  }
		  var row = state.getIn([action.id, 'items']).filter((item) => item.get('id') == action.primaryKey);
		  if (row.count()) {
			  let index = state.getIn([action.id, 'items']).indexOf(row.get(0));
			  state = state.setIn([action.id, 'items', index, action.field], immutable.fromJS(action.value));
		  }
		  let oldValue = row && row.get(0) ? row.getIn([0, action.field]) : null;
		  inline = inline.set('pending', true).set('oldValue', oldValue);
		  return state
			  		.setIn([action.id, 'inline', action.field, action.primaryKey], inline);

	  case SAVE_INLINE_SUCCESS:
		  return state.deleteIn([action.id, 'inline', action.field, action.primaryKey]);

	  case SAVE_INLINE_FAIL:
		  var inline = state.getIn([action.id, 'inline', action.field, action.primaryKey]);
		  var row = state.getIn([action.id, 'items']).filter((item) => item.get('id') == action.primaryKey);
		  if (row.count()) {
			  let index = state.getIn([action.id, 'items']).indexOf(row.get(0));
			  state = state.setIn([action.id, 'items', index, action.field], immutable.fromJS(inline.get('oldValue')));
		  }
		  return state.deleteIn([action.id, 'inline', action.field, action.primaryKey]);

	  case SET_PAGE:
		  return state.setIn([action.id, 'page'], action.page);

	  case SET_SORT:
		  return state.setIn([action.id, 'sort'], immutable.fromJS(action.sort));

	  case SET_FILTER:
		  return state
			  		.setIn([action.id, 'page'], 1)
			  		.setIn([action.id, '_filter'], action.value)
			  		.setIn([action.id, 'filter'], action.value);

	  case SET_FILTER_LIVE:
		  return state
			  		.setIn([action.id, '_filter'], action.value);

	  case ADD_SELECTED_ROWS:
		  var selected = state.getIn([action.id, 'selected']);
		  if (!selected) {
			  selected = immutable.List();
		  }
		  action.ids.forEach((id) => {
			  if (selected.indexOf(id) == -1) {
				  selected = selected.push(id);
			  }
		  });
		  return state.setIn([action.id, 'selected'], selected);

	  case REMOVE_SELECTED_ROWS:
		  var selected = state.getIn([action.id, 'selected']);
		  if (!selected) {
			  selected = immutable.List();
		  }
		  action.ids.forEach((id) => {
			  const i = selected.indexOf(id);
			  if (i != -1) {
				  selected = selected.splice(i, 1);
			  }
		  });
		  return state.setIn([action.id, 'selected'], selected);

	  case EXPAND_ROWS:
		  var list = state.getIn([action.id, 'expanded']);
		  if (!list) {
			  list = immutable.List();
		  }
		  action.ids.forEach((id) => {
			  if (list.indexOf(id) == -1) {
				  list = list.push(id);
			  }
		  });
		  return state.setIn([action.id, 'expanded'], list);

	  case COLLAPSE_ROWS:
		  var list = state.getIn([action.id, 'expanded']);
		  if (!list) {
			  list = immutable.List();
		  }
		  action.ids.forEach((id) => {
			  const i = list.indexOf(id);
			  if (i != -1) {
				  list = list.splice(i, 1);
			  }
		  });
		  return state.setIn([action.id, 'expanded'], list);

	  default:
      	return state;
  }
}