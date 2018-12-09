import React, { Component } from "react"
import PropTypes from 'prop-types'


class MenuButton extends Component {
	render() {
		const { onMenuClick } = this.props
		return (
			<div onClick={onMenuClick} className="menu-btn">
				𝄘
			</div>
		)
	}
}

export default MenuButton;