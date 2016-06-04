import Cell from './Cell';
import React from 'react';
import {Map} from 'immutable';
import Row from './Row';
import RowDetail from './RowDetail';


export default class Rows extends React.Component {

	shouldComponentUpdate(nextProps, nextState) {

		const shouldUpdate = this.props.rows != nextProps.rows ||
			this.props.multiAction != nextProps.multiAction ||
			this.props.selected != nextProps.selected ||
			this.props.expanded != nextProps.expanded;

		return shouldUpdate;
	}


	render() {
		const expandable = !!this.props.expandableComponent;
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
					multiAction={this.props.multiAction}
					expandable={expandable}
					expanded={expanded}
					masterdetail={this.props.masterdetail}
					onExpand={(row, checked) => this.props.handleExpand(row, checked)}
					onSelect={(row, checked) => this.props.handleSelect(row, checked)}
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
						expandableComponentProps={this.props.expandableComponentProps}
						selected={isSelected}
						multiAction={this.props.multiAction}
					/>);
				}
				return rows;
			});
		}

		if (this.props.rows.count() == 0) {
			rows = <tr>
				<td colSpan="99" style={{color: '#BBB'}}>&nbsp;{this.props.emptyText}</td>
			</tr>;
		}

		return (
			<tbody>
				{rows}
			</tbody>
		)
	}
}