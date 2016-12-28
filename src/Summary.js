import Component from './Component';
import React from 'react';
import immutable from 'immutable';

export default class Summary extends Component {

	static propTypes = {
		/**
		 * Columns definition
		 */
		columnModel: React.PropTypes.array.isRequired,
		/**
		 * Row data
		 */
		data: React.PropTypes.instanceOf(immutable.Map),
		/*
		 * Has multiactions
		 */
		multiAction: React.PropTypes.bool,
		/**
		 * Expandable datagrid
		 */
		expandable: React.PropTypes.bool
	};

	isEmpty() {
		let has = false;
		this.props.columnModel.forEach((column) => {
			if (this.props.data && this.props.data.get(column.name)) {
				has = true;
			}
		});
		return !has;
	}

	render() {

		if (this.isEmpty()) {
			return <tfoot></tfoot>;
		}

		const cells = this.props.columnModel.filter(column => column.visible !== false).map((column) => {

			let style = {};
			if (column.style) {
				style = column.style;
			}
			if (column.align) {
				style.textAlign = column.align;
			}
			let className;
			if (column.viewport) {
				className = 'vp-' + column.viewport;
			}
			let value;
			if (this.props.data.get(column.name) != null) {
				value = this.props.data.get(column.name);
			}
			if (column.summary && column.summary instanceof Function) {
				value = column.summary(value && value.toJS ? value.toJS() : value, this.props.data.toJS(), column);
			}
			return (
				<td key={column.name} style={style} className={className}>
					{value}
				</td>
			);
		});

		return (
			<tfoot>
				<tr>
					{this.props.expandable && <td></td>}
					{this.props.multiAction && <td></td>}
					{cells}
				</tr>
			</tfoot>
		);
	}
}