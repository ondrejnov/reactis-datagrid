import React from 'react';
import Header from './Header';
import Summary from './Summary';
import HeaderFilter from './HeaderFilter';
import immutable from 'immutable';
import Rows from './Rows';

export default class Table extends React.Component {

	static propTypes = {
		columnModel: React.PropTypes.array.isRequired,
		rows: React.PropTypes.object,
		primaryKey: React.PropTypes.string,
		selected: React.PropTypes.instanceOf(immutable.List).isRequired,
		expanded: React.PropTypes.instanceOf(immutable.List).isRequired,
		expandable: React.PropTypes.bool.isRequired,
		getRowClassName: React.PropTypes.func,
		expandableComponent: React.PropTypes.func,
		expandableComponentProps: React.PropTypes.object,
		emptyText: React.PropTypes.string,
		multiAction: React.PropTypes.bool.isRequired,
		masterdetail: React.PropTypes.bool.isRequired,
		className: React.PropTypes.string,
		sort: React.PropTypes.object,
		filter: React.PropTypes.object,
		summary: React.PropTypes.object,
		preHead: React.PropTypes.element,
		disableSummary: React.PropTypes.bool
	};

	constructor(props) {
		super(props);
		this.handleSelectAll = this.handleSelectAll.bind(this);
		this.handleSort = this.handleSort.bind(this);
		this.state = {
			mouseDown: false
		}
	}

	handleSelectAll(checked) {
		this.props.handleSelectAll(checked)
	}

	handleSort(sort) {
		this.props.handleSort(sort)
	}

	componentDidMount() {
		/*$(document).mouseup((ev) => {
			this.setState({mouseDown: false});
		});*/
	}

	handleMouseDown(e) {
		this.setState({mouseDown: true});
		//e.preventDefault();
	}

	render() {

		const expandable = !!this.props.expandableComponent;

		let className = 'table datatable-basic table-bordered table-hover dataTable no-footer';
		if (!expandable) {
			className += ' table-striped';
		}
		if (this.props.className) {
			className += ' ' + this.props.className;
		}

		return (
			<table className={className} onMouseDown={(e)=>this.handleMouseDown(e)}>
				<thead>
				{this.props.preHead}
				<Header
					columnModel={this.props.columnModel}
					multiAction={this.props.multiAction}
					expandable={expandable}
					sortBy={this.props.sort}
					onSort={this.handleSort}
					onSelectAll={this.handleSelectAll}
				/>
				{this.props.filter && <HeaderFilter
					filter={this.props.filter}
					expandable={expandable}
					values={this.props.filter.getValues()}
					columnModel={this.props.columnModel}
					onSelectAll={this.handleSelectAll}
					multiAction={this.props.multiAction}
				/>}
				</thead>
				{(this.props.rows.count() > 0 || !this.props.loading) &&
				<Rows
					columnModel={this.props.columnModel}
					rows={this.props.rows}
					mouseDown={this.state.mouseDown}
					primaryKey={this.props.primaryKey}
					selected={this.props.selected}
					masterdetail={this.props.masterdetail}
					expanded={this.props.expanded}
					expandable={this.props.expandable}
					getRowClassName={this.props.getRowClassName}
					expandableComponent={this.props.expandableComponent}
					expandableComponentProps={this.props.expandableComponentProps}
					emptyText={this.props.emptyText}
					multiAction={this.props.multiAction}
					shouldUpdateKey={this.props.shouldUpdateKey}
					handleSelect={this.props.handleSelect}
					handleExpand={this.props.handleExpand}
				/>}
				{this.props.rows.count() == 0 && this.props.loading &&
					<tbody>
					<tr>
						<td colSpan="99" style={{color: '#444'}}>&nbsp;{this.props.loadingText}</td>
					</tr>
					</tbody>
				}
				{this.props.rows.count() > 0 && !this.props.disableSummary &&
				<Summary columnModel={this.props.columnModel}
						 data={this.props.summary}
						 expandable={expandable}
						 multiAction={this.props.multiAction}/>
				}
			</table>
		)
	}
}