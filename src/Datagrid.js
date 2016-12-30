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
		// disabled summary row
		disableSummary: React.PropTypes.bool,
		// Actual sort
		sort: React.PropTypes.object,
		// Filter
		filter: React.PropTypes.object,
		// Filter
		masterdetail: React.PropTypes.bool.isRequired,
		// Selected rows for multi action
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
		expandableComponentProps: React.PropTypes.object,
		// Class of altervative body component
		bodyComponentClass: React.PropTypes.func,
		bodyComponentProps: React.PropTypes.object,
		// loader image
		loaderImage: React.PropTypes.string,
		// CSS table class
		className: React.PropTypes.string,
		// row before header
		preHead: React.PropTypes.element,
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
		disableSummary: false,
		masterdetail: false,
		multiActions: [],
		selected: immutable.List(),
		expanded: immutable.List(),
		emptyText: 'Žádné záznamy k zobrazení',
		loadingText: 'Načítám data...'
	};

	constructor(props) {
		super(props);
		this.handlePage = this.handlePage.bind(this);
		this.handleActionSelect = this.handleActionSelect.bind(this);
	}

	handleSort(nextSort) {
		if (this.props.onSort) {
			this.props.onSort(nextSort)
		}
	}

	handleSelect(row, checked) {
		if (this.props.masterdetail) {
			this.handleSelectAll(false);
		}

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
			},
			count: this.props.selected.count() ? this.props.selected.count() : this.props.totalCount
		};

		if (multiAction.onClick) {
			multiAction.onClick(selected);
		}
	}

	handleKeyDown(e) {
		if (this.props.masterdetail) {
			if (e.keyCode == 38 || e.keyCode == 40) {
				e.preventDefault();
			}
			if (e.keyCode == 40 && this.props.onSelectNext) {
				this.props.onSelectNext();
			}
			if (e.keyCode == 38 && this.props.onSelectPrev) {
				this.props.onSelectPrev();
			}
			const maxPage = Math.ceil(this.props.totalCount / this.props.limit);
			if (e.keyCode == 39 && this.props.page < maxPage) {
				this.handlePage(this.props.page + 1);
			}
			if (e.keyCode == 37 && this.props.page > 1) {
				this.handlePage(this.props.page - 1);
			}
		}

	}

	renderTable() {
		const expandable = !!this.props.expandableComponent;
		const multiAction = !this.props.compact && this.props.multiActions && this.props.multiActions.length > 0;

		return (
			<Table
				columnModel={this.props.columnModel}
				rows={this.props.rows}
				primaryKey={this.props.primaryKey}
				selected={this.props.selected}
				expanded={this.props.expanded}
				expandable={expandable}
				getRowClassName={this.props.getRowClassName}
				className={this.props.className}
				expandableComponent={this.props.expandableComponent}
				expandableComponentProps={this.props.expandableComponentProps}
				emptyText={this.props.emptyText}
				loading={!!this.props.pending}
				loadingText={this.props.loadingText}
				sort={this.props.sort}
				filter={this.props.filter}
				summary={this.props.summary}
				disableSummary={this.props.disableSummary}
				masterdetail={this.props.masterdetail}
				multiAction={!!multiAction}
				preHead={this.props.preHead}
				handleSelect={this.handleSelect.bind(this)}
				handleExpand={this.handleExpand.bind(this)}
				handleSelectAll={this.handleSelectAll.bind(this)}
				handleSort={this.handleSort.bind(this)}
			/>);
	}

	renderBody() {
		if (this.props.bodyComponentClass) {
			const factory = React.createFactory(this.props.bodyComponentClass);
			const body = new factory({
					...this.props,
					handleSelect: this.handleSelect.bind(this),
					handleExpand: this.handleExpand.bind(this),
					handleSelectAll: this.handleSelectAll.bind(this),
					handleSort: this.handleSort.bind(this),
					...this.props.bodyComponentProps
			});
			return body;
		}
		return this.renderTable();
	}

	render() {

		let multiAction = this.props.multiActions && this.props.multiActions.length > 0;
		let paginatorLength = 3;
		let paginatorSurround = 2;

		if (this.props.compact) {
			paginatorLength = 2;
			paginatorSurround = 1;
			multiAction = false;
		}

		return (
			<div className="datagrid" tabIndex="1" onKeyDown={(e) => this.handleKeyDown(e)}>
				<div style={{position:'relative'}}>
					<Loader visible={!!this.props.pending} img={this.props.loaderImage}/>
					{this.renderBody()}
				</div>
				{multiAction &&
					<MultiActionButton
						actions={this.props.multiActions}
						selected={this.props.selected}
						totalCount={this.props.totalCount}
						onActionSelect={this.handleActionSelect}
					/>
				}
				{!!this.props.page &&
				<Paginator
					count={this.props.totalCount}
					steps={paginatorLength}
					limit={this.props.limit}
					page={this.props.page}
					surround={paginatorSurround}
					compact={this.props.compact}
					onPage={this.handlePage}
				/>
				}
				<div style={{clear:'both'}}></div>
			</div>);
	}
}

export default Datagrid;