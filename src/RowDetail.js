import Cell from './Cell';
import React from 'react';
import {Map} from 'immutable';

export default class RowDetail extends React.Component {

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
		 * Is selected row
		 */
		selected: React.PropTypes.bool,
		/**
		 * Is expanded and visible
		 */
		visible: React.PropTypes.bool.isRequired,
		/**
		 * Class of expandable component
		 */
		expandableComponent: React.PropTypes.func.isRequired,
		/*
		 * Multiactions
		 */
		multiAction: React.PropTypes.any
	};

	shouldComponentUpdate(nextProps, nextState) {
		return this.props.data != nextProps.data ||
			this.props.multiAction != nextProps.multiAction ||
			this.props.selected != nextProps.selected ||
			this.props.visible != nextProps.visible;
	}

	render() {
		//		value: this.props.data.get(column.field)
		let cn = this.props.className;
		if (this.props.selected) {
			cn += ' selected';
		}
		if (!this.props.visible) {
			cn += ' hide';
		}
		let checkCell = false;
		if (this.props.multiAction) {
			checkCell = <td className="ch"></td>;
		}
		const factory = new React.createFactory(this.props.expandableComponent);
		const component = new factory({data: this.props.data});
		return (
			<tr className={cn}><td>&nbsp;</td><td colSpan={this.props.columnModel.length+1}>{component}</td></tr>
		)
	}
}