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
		expandableComponentProps: React.PropTypes.object,
		bodyComponentClass: React.PropTypes.func,
		bodyComponentProps: React.PropTypes.object,
		fixedFilter: React.PropTypes.object,
		forceFilter: React.PropTypes.bool,
		className: React.PropTypes.string,
		loaderImage: React.PropTypes.string,
		preHead: React.PropTypes.element,
		disableSummary: React.PropTypes.bool,
		onSelect: React.PropTypes.func,
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

	static childContextTypes = {
		datagrid: React.PropTypes.object
	};

	getChildContext() {
		return {
			datagrid: this
		};
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
			if (!shallowEqual(this.props.fixedFilter, nextProps.fixedFilter) && nextProps.state.get('page') != 1) {
				this.props.actions.setPage(this.props.id, 1);
			}
			else {
				this.load(nextProps.state, nextProps.fixedFilter);
			}
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

	getQueryObject() {
		const s = this.props.state.toJS();
		s.filter = {...s.filter, ...this.props.fixedFilter};
		return {
			page: s.page,
			sort: s.sort,
			limit: this.props.limit,
			filter: s.filter
		}
	}

	saveInline(apiMethod, field, args, cellValue) {
		return this.props.actions.saveInline(this.props.id, apiMethod, field, args, cellValue);
	}

	setInline(field, args, cellValue) {
		return this.props.actions.setInline(this.props.id, field, args, cellValue);
	}

	load(state = this.props.state, fixedFilter = this.props.fixedFilter) {
		const s = state.toJS();
		s.filter = {...s.filter, ...fixedFilter};
		this.props.actions.load(this.props.id, this.props.api, s, this.props.limit, this.props.saveState);
	}

	handleSelect(ids) {
		this.props.actions.addSelectedRows(this.props.id, ids, !this.props.masterdetail);
		if (this.props.onSelect) {
			this.props.onSelect(ids);
		}
	}

	handleSelectMove(offset) {
		const action = this.props.actions.selectedMove(this.props.id, offset)
		if (this.props.onSelect) {
			this.props.onSelect([action.result]);
		}
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
				disableSummary={this.props.disableSummary}
				selected={this.props.state.get('selected')}
				totalCount={this.props.state.get('count')}
				pending={!!this.props.state.get('pending')}
				getRowClassName={this.props.getRowClassName}
				loaderImage={this.props.loaderImage}
				compact={this.props.compact}
				limit={this.props.limit}
				preHead={this.props.preHead}
				className={this.props.className}
				masterdetail={this.props.masterdetail}
				expanded={this.props.state.get('expanded')}
				expandableComponent={this.props.expandableComponent}
				expandableComponentProps={this.props.expandableComponentProps}
				bodyComponentClass={this.props.bodyComponentClass}
				bodyComponentProps={this.props.bodyComponentProps}
				shouldUpdateKey={this.props.shouldUpdateKey}
				onPage={(page) => this.props.actions.setPage(this.props.id, page)}
				onSort={(sort) => this.props.actions.setSort(this.props.id, sort)}
				onSelect={(ids) => this.handleSelect(ids)}
				onUnSelect={(ids) => this.props.actions.removeSelectedRows(this.props.id, ids)}
				onExpand={(ids) => this.props.actions.expandRows(this.props.id, ids)}
				onCollapse={(ids) => this.props.actions.collapseRows(this.props.id, ids)}
				onSelectNext={() => this.handleSelectMove(1)}
				onSelectPrev={() => this.handleSelectMove(-1)}
			/>
		)
	}
}