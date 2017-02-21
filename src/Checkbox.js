import Component from './Component';
import React from 'react';

export default class Checkbox extends Component {

	static defaultProps = {
		color: '#666666',
		value: null
	};

	constructor(props) {
		super(props);
		this.state = {
			value: props.value
		}
	}

	handleChange() {
		this.setState({value: !this.state.value}, () => {
			if (this.props.onChange) {
				this.props.onChange(this.props.value === null ? this.state.value : !this.props.value);
			}
		});
	}

	render() {
		const checked = this.props.value === null ? !!this.state.value : !!this.props.value;
		const cn = checked ? 'icon-checkbox-checked' : 'icon-checkbox-unchecked';

		return (
			<div style={{display: 'inline'}} onClick={() => this.handleChange()}>
				<span style={{color:this.props.color, fontSize: 14}} className={cn}></span>
			</div>
		)
	}
}