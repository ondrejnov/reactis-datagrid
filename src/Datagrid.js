import React from 'react';
import MultiActionButton from './MultiactionButton';
import Paginator from './Paginator';
import Loader from './Loader';
import Table from './Table';
import immutable from 'immutable';

class Datagrid extends React.Component {

	static propTypes = {
		// Column definitions
		columnModel: React.PropTypes.array.isRequired,
		// Data rows
		rows: React.PropTypes.object,
		// Actual page
		page: React.PropTypes.number,
		// Rows per page
		limit: React.PropTypes.number,
		// Total rows
		totalCount: React.PropTypes.number,
		// Summery row
		summary: React.PropTypes.instanceOf(immutable.Map),
		// Actual sort
		sort: React.PropTypes.object,
		// Filter
		filter: React.PropTypes.object,
		// Selected rows
		selected: React.PropTypes.instanceOf(immutable.List),
		// Expanded rows
		expanded: React.PropTypes.instanceOf(immutable.List),
		// String for empty datagrid
		emptyText: React.PropTypes.string,
		// String for loading datagrid
		loadingText: React.PropTypes.string,
		// Multi action list
		multiActions: React.PropTypes.array,
		// Primary key
		primaryKey: React.PropTypes.string,
		// compact mode
		compact: React.PropTypes.bool,
		// show progress indicator
		pending: React.PropTypes.bool,
		// Row className
		getRowClassName: React.PropTypes.func,
		// Class of expandable component
		expandableComponent: React.PropTypes.func,
		// CSS table class
		className: React.PropTypes.string,
		// Page select event
		onPage: React.PropTypes.func,
		// Sort event
		onSort: React.PropTypes.func,
		// Select row(s) event
		onSelect: React.PropTypes.func,
		// Unselect row(s) event
		onUnSelect: React.PropTypes.func,
		// Expand row(s) event
		onExpand: React.PropTypes.func,
		// Collapse row(s) event
		onCollapse: React.PropTypes.func
	};

	static defaultProps = {
		primaryKey: 'id',
		limit: 25,
		compact: false,
		pending: false,
		multiActions: [],
		selected: immutable.List(),
		expanded: immutable.List(),
		emptyText: 'Žádné záznamy k zobrazení',
		loadingText: 'Načítám data...'
	};

	constructor(props) {
		super(props);
	}

	handleSort(nextSort) {
		if (this.props.onSort) {
			this.props.onSort(nextSort)
		}
	}

	handleSelect(row, checked) {
		const id = row.get(this.props.primaryKey);
		if (checked) {
			if (this.props.onSelect) {
				this.props.onSelect([id]);
			}
		}
		else {
			if (this.props.onUnSelect) {
				this.props.onUnSelect([id]);
			}
		}
	}

	handleExpand(row, checked) {
		const id = row.get(this.props.primaryKey);
		if (checked) {
			if (this.props.onExpand) {
				this.props.onExpand([id]);
			}
		}
		else {
			if (this.props.onCollapse) {
				this.props.onCollapse([id]);
			}
		}
	}

	handleSelectAll(checked) {
		const ids = this.props.rows.map((item) => item.get(this.props.primaryKey));
		if (checked) {
			if (this.props.onSelect) {
				this.props.onSelect(ids);
			}
		}
		else {
			if (this.props.onUnSelect) {
				this.props.onUnSelect(ids);
			}
		}
	}

	handlePage(page) {
		this.props.onPage(page)
	}

	handleActionSelect(multiAction) {
		const selected = {
			selected: this.props.selected.toJS(),
			queryObject: {
				sort: this.props.sort,
				filter: this.props.filter.getValues().toJS()
			}
		};
		if (multiAction.onClick) {
			multiAction.onClick(selected);
		}
	}

	render() {

		const expandable = !!this.props.expandableComponent;

		let multiAction = this.props.multiActions && this.props.multiActions.length > 0;
		let paginatorLength = 3;
		let paginatorSurround = 2;

		if (this.props.compact) {
			paginatorLength = 3;
			paginatorSurround = 1;
			multiAction = false;
		}

		return (
			<div className="datagrid">
				<div style={{position:'relative'}}>
					<Loader visible={!!this.props.pending}/>
					<Table
						columnModel={this.props.columnModel}
						rows={this.props.rows}
						primaryKey={this.props.primaryKey}
						selected={this.props.selected}
						expanded={this.props.expanded}
						expandable={expandable}
						getRowClassName={this.props.getRowClassName}
						expandableComponent={this.props.expandableComponent}
						emptyText={this.props.emptyText}
						sort={this.props.sort}
						filter={this.props.filter}
						summary={this.props.summary}
						multiAction={!!multiAction}
						handleSelect={this.handleSelect.bind(this)}
						handleExpand={this.handleExpand.bind(this)}
						handleSelectAll={this.handleSelectAll.bind(this)}
						handleSort={this.handleSort.bind(this)}
					/>
				</div>
				{multiAction &&
					<MultiActionButton
						actions={this.props.multiActions}
						selected={this.props.selected}
						totalCount={this.props.totalCount}
						onActionSelect={(multiActionItem) => this.handleActionSelect(multiActionItem) }
					/>
				}
				{!!this.props.page &&
				<Paginator
					count={this.props.totalCount}
					steps={paginatorLength}
					limit={this.props.limit}
					page={this.props.page}
					surround={paginatorSurround}
					onPage={(page) => this.handlePage(page)}
				/>
				}
				<div style={{clear:'both'}}></div>
			</div>);
	}
}

export default Datagrid;