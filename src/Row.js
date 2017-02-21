import Cell from './Cell';
import React from 'react';
import {Map} from 'immutable';
import Checkbox from './Checkbox';

export default class Row extends React.Component {

	static propTypes = {
		/**
		 * Columns definition
		 */
		columnModel: React.PropTypes.array.isRequired,
		/**
		 * Columns definition
		 */
		id: React.PropTypes.any,
		/**
		 * Row data
		 */
		data: React.PropTypes.instanceOf(Map),
		/**
		 * Row className
		 */
		className: React.PropTypes.string,
		/**
		 * is selected row
		 */
		selected: React.PropTypes.bool.isRequired,
		/**
		 * is row expandable
		 */
		expandable: React.PropTypes.bool.isRequired,
		/**
		 * Select row event
		 */
		onSelect: React.PropTypes.func,
		/**
		 * Expand/Collapse row event
		 */
		onExpand: React.PropTypes.func,
		/*
		 * Multiactions
		 */
		multiAction: React.PropTypes.any
	};

	shouldComponentUpdate(nextProps, nextState) {

		const shouldUpdate = this.props.data != nextProps.data ||
			this.props.multiAction != nextProps.multiAction ||
			this.props.selected != nextProps.selected ||
			this.props.expanded != nextProps.expanded;

		return shouldUpdate;
	}

	handleRowClick(e) {
		if (this.props.masterdetail) {
			if (this.props.onSelect) {
				this.props.onSelect(this.props.data, true);
			}
		}
	}

	handleToggleSelect(val) {
		if (this.props.onSelect) {
			this.props.onSelect(this.props.data, val);
		}
	}

	render() {
		const cells = this.props.columnModel.filter(column => column.visible !== false).map((column) => {
			let factory = column.factory;
			if (!factory) {
				factory = new React.createFactory(Cell);
			}
			return new factory({
				key: column.name,
				column: column,
				row: this.props.data,
				value: this.props.data.get(column.field)
			});
		});

		let cn = this.props.className;
		if (this.props.selected) {
			cn += ' selected';
		}
		let checkCell = false;
		if (this.props.multiAction) {
			checkCell = <td className="ch">
				<Checkbox value={this.props.selected} onChange={(val) => this.handleToggleSelect(val)} />
			</td>;
		}
		let expandable = false;
		if (this.props.expandable) {
			let cnex = false;
			if (this.props.expanded === true) {
				cnex = 'fa fa-caret-down';
			}
			if (this.props.expanded === false) {
				cnex = 'fa fa-caret-right';
			}
			expandable = <td style={{textAlign:'center', cursor: 'pointer'}}
							 onClick={() => this.props.onExpand(this.props.data, !this.props.expanded)}>
							{cnex && <span className={cnex}></span>}
						</td>;
		}
		return (
			<tr onClick={(e) => this.handleRowClick(e)} className={cn}>{checkCell}{expandable}{cells}</tr>
		)
	}
}