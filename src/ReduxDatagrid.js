import React from 'react';
import DataGrid from './Datagrid';
import immutable from 'immutable';
import {connect} from 'react-redux';
import * as actions from './actions';
import {bindActionCreators} from 'redux';
import FilterField from './FilterField';
import shallowEqual from 'react-pure-render/shallowEqual';

@connect(
	(state, ownProps) => {
		return {
			state: state.datagrids.get(ownProps.id)
		};
	},
	(dispatch) => {
		return {actions: bindActionCreators(actions, dispatch)};
	}, null, {withRef: true })
export default class ReduxDatagrid extends React.Component {

	static propTypes = {
		id: React.PropTypes.any.isRequired,
		columnModel: React.PropTypes.array.isRequired,
		state: React.PropTypes.object,
		filter: React.PropTypes.object,
		defaultFilter: React.PropTypes.object,
		api: React.PropTypes.string.isRequired,
		defaultSort: React.PropTypes.object,
		multiActions: React.PropTypes.array,
		getRowClassName: React.PropTypes.func,
		limit: React.PropTypes.number.isRequired,
		compact: React.PropTypes.bool,
		expandableComponent: React.PropTypes.func,
		fixedFilter: React.PropTypes.object,
		className: React.PropTypes.string
	};

	static defaultProps = {
		limit: 25,
		defaultFilter: {}
	};

	constructor(props) {
		super(props);
		this.filter = this.props.filter;
		if (this.props.filter) {
			this.filter.on('change', this.handleFilterChange, this);
		}
	}

	componentDidMount() {

		if (!this.props.state || this.props.forceFilter) {
			const defaultState = {
				items: [],
				filter: this.props.defaultFilter,
				page: 1,
				count: 0,
				summary: {},
				sort: this.props.defaultSort
			};
			if (this.filter) {
				this.filter.setValues(immutable.fromJS(this.props.defaultFilter));
			}
			this.props.actions.initDefault(this.props.id, defaultState);
		}
		else {
			if (this.filter) {
				this.filter.setValues(this.props.state.get('filter'));
			}
			this.load();
		}
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.state && this.props.state.get('_filter') != nextProps.state.get('_filter') && nextProps.state.get('_filter')) {
			this.filter.setValues(nextProps.state.get('_filter'))
		}

		if (!this.props.state && nextProps.state ||
			(this.props.state.get('page') != nextProps.state.get('page') ||
			this.props.state.get('filter') != nextProps.state.get('filter') ||
			this.props.state.get('sort') != nextProps.state.get('sort') ||
			!shallowEqual(this.props.fixedFilter, nextProps.fixedFilter))
		) {
			this.load(nextProps.state, nextProps.fixedFilter);
		}
	}

	componentWillUnmount() {
		if (this.props.filter) {
			this.props.filter.removeListener('change', this.handleFilterChange, this);
		}
	}


	handleFilterChange(key, value, values) {
		this.props.actions.setFilterLive(this.props.id, values);
		const delay = this.props.filter.schema[key] && this.props.filter.schema[key].class.filterDelay;
		if (this.filterTimeout) {
			clearTimeout(this.filterTimeout);
		}
		if (delay && value !== null) {
			this.filterTimeout = setTimeout(() => {
				this.props.actions.setFilter(this.props.id, values);
			}, 333)
		}
		else {
			this.props.actions.setFilter(this.props.id, values);
		}
	}

	refresh() {
		this.load();
	}

	saveInline(apiMethod, field, args) {
		this.props.actions.saveInline(this.props.id, apiMethod, field, args);
	}

	load(state = this.props.state, fixedFilter = this.props.fixedFilter) {
		const s = state.toJS();
		s.filter = {...s.filter, ...fixedFilter};
		this.props.actions.load(this.props.id, this.props.api, s, this.props.limit, this.props.saveState);
	}

	render() {
		if (!this.props.state) {
			return null;
		}
		return (
			<DataGrid
				columnModel={this.props.columnModel}
				multiActions={this.props.multiActions}
				rows={this.props.state.get('items')}
				page={this.props.state.get('page')}
				sort={this.props.state.get('sort')}
				filter={this.filter}
				summary={this.props.state.get('summary')}
				selected={this.props.state.get('selected')}
				totalCount={this.props.state.get('count')}
				pending={!!this.props.state.get('pending')}
				getRowClassName={this.props.getRowClassName}
				limit={this.props.limit}
				className={this.props.className}
				compact={this.props.compact}
				expanded={this.props.state.get('expanded')}
				expandableComponent={this.props.expandableComponent}
				onPage={(page) => this.props.actions.setPage(this.props.id, page)}
				onSort={(sort) => this.props.actions.setSort(this.props.id, sort)}
				onSelect={(ids) => this.props.actions.addSelectedRows(this.props.id, ids)}
				onUnSelect={(ids) => this.props.actions.removeSelectedRows(this.props.id, ids)}
				onExpand={(ids) => this.props.actions.expandRows(this.props.id, ids)}
				onCollapse={(ids) => this.props.actions.collapseRows(this.props.id, ids)}
			/>
		)
	}
}