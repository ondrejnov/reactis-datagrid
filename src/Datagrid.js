import React from 'react';
import Header from './Header';
import HeaderFilter from './HeaderFilter';
import MultiActionButton from './MultiactionButton';
import Paginator from './Paginator';
import Row from './Row';
import RowDetail from './RowDetail';
import Summary from './Summary';
import Loader from './Loader';
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
		// Selected rows
		selected: React.PropTypes.instanceOf(immutable.List),
		// Expanded rows
		expanded: React.PropTypes.instanceOf(immutable.List),
		// String for empty datagrid
		emptyText: React.PropTypes.string,
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

		let rows = [];
		if (this.props.rows) {
			rows = this.props.rows.map((row, index) => {
				const isSelected = this.props.selected.indexOf(row.get(this.props.primaryKey)) != -1;
				const expanded = this.props.expanded.indexOf(row.get(this.props.primaryKey)) != -1;
				const cn = this.props.getRowClassName ? this.props.getRowClassName(row.toJS(), index) : null;
				const rows = [];
				rows.push(<Row
							columnModel={this.props.columnModel}
							className={cn}
							data={row}
							id={row.get(this.props.primaryKey)}
							key={row.get(this.props.primaryKey)}
							selected={isSelected}
							multiAction={!!multiAction}
							expandable={expandable}
							expanded={expanded}
							onExpand={(row, checked) => this.handleExpand(row, checked)}
							onSelect={(row, checked) => this.handleSelect(row, checked)}
				/>);
				if (expandable) {
					rows.push(<RowDetail
						columnModel={this.props.columnModel}
						visible={expanded}
						className={cn}
						data={row}
						id={row.get(this.props.primaryKey)}
						key={'detail_' + row.get(this.props.primaryKey)}
						expandableComponent={this.props.expandableComponent}
						selected={isSelected}
						multiAction={!!multiAction}
					/>);
				}
				return rows;
			});
		}

		if (this.props.rows.count() == 0) {
			if (this.props.pending) {
				rows = <tr>
					<td colSpan="99" style={{color: '#666'}}>
						&nbsp;{this.props.loadingText}
					</td>
				</tr>;
			}
			else {
				rows = <tr>
					<td colSpan="99" style={{color: '#BBB'}}>&nbsp;{this.props.emptyText}</td>
				</tr>;
			}
		}

		let className = 'table datatable-basic table-bordered table-hover dataTable no-footer';
		if (!expandable) {
			className += ' table-striped';
		}
		if (this.props.className) {
			className += ' ' + this.props.className;
		}

		return (
			<div className="datagrid">
				<div style={{position:'relative'}}>
					<Loader visible={!!this.props.pending}/>
					<table className={className}>
						<thead>
							<Header
								columnModel={this.props.columnModel}
								multiAction={!!multiAction}
								expandable={expandable}
								sortBy={this.props.sort ? this.props.sort.toJS() : null}
								onSort={(sort) => this.handleSort(sort)}
								onSelectAll={(checked) => this.handleSelectAll(checked)}
							/>
							{this.props.filter && <HeaderFilter
								filter={this.props.filter}
								expandable={expandable}
								values={this.props.filter.getValues()}
								columnModel={this.props.columnModel}
								onSelectAll={(checked) => this.handleSelectAll(checked)}
								multiAction={!!multiAction}
							/>}
						</thead>
						<tbody>
							{rows}
						</tbody>
						{this.props.rows.count() > 0 &&
							<Summary columnModel={this.props.columnModel}
									 data={this.props.summary}
									 expandable={expandable}
									 multiAction={!!multiAction}/>
						}
					</table>
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