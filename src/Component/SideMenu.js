import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp';

class SideMenu extends Component {
   	render() {
   		const { onCloseClick, places, currentQuery, onQueryInput, onItemClick,
   				onInputClick, onItemFocus, onItemKeyUp} = this.props
   		const reg = new RegExp(escapeRegExp(currentQuery).toLowerCase().trim())

   		return(
   			<div className="sidebar">
		        <button aria-label="Close sidebar" onClick={onCloseClick} className="close-sidebar">X</button>
		        <div>
			        <label htmlFor="search-place">Search a place</label>
			        <input
			          id="search-venue"
			          onChange={onQueryInput}
			          onClick={onInputClick}
			          type="text"
			          placeholder="Search..."
			          value={currentQuery} />
		        </div>
		        <ul>
					{places.filter(place => {
						return reg.test(place.title.toLowerCase())
						})
						.map((place, index) => {
							return (
							<li
							tabIndex="0"
							onKeyUp={onItemKeyUp}
							onClick={onItemClick}
							key={index}>{'- ' + place.title}</li>
						)
					})}
		        </ul>
	        </div>
   		)
	}
}

export default SideMenu;
