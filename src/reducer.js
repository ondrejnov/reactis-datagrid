import immutable from 'immutable';
import {INIT_DEFAULT, DESTROY,
	LOAD, LOAD_SUCCESS,
	SET_PAGE, SET_SORT, SET_FILTER, SET_FILTER_LIVE,
	ADD_SELECTED_ROWS, REMOVE_SELECTED_ROWS,
	EXPAND_ROWS, COLLAPSE_ROWS
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