import React from 'react';

class FilterField extends React.Component {

	render() {
		if (!this.props.filter) {
			return false;
		}
		return (
			<span className={this.props.className} style={this.props.style}>
				<table>
					<tbody>
						<tr>
							{this.props.label && <td style={{paddingRight:5}}>{this.props.label}:</td>}
							<td style={{width: this.props.width}}>{this.props.filter.getControl(this.props.field)}</td>
						</tr>
					</tbody>
				</table>
			</span>
		);
	}
}

export default FilterField;