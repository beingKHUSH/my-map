import React, { Component } from 'react';
import PropTypes from 'prop-types';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

class SideMenu extends Component {
	state = {
		query: ''
	}

	updateQuery = (query) => {
		this.setState({ query: query.trim() })
	}

	clearQuery = () => {
		this.setState({ query: '' })
	}
   	render() {
   		const { nearByHotels , displayMarker} = this.props
	    const { query } = this.state

	    let showingHotels
	    if (query) {
	      const match = new RegExp(escapeRegExp(query), 'i')
	      showingHotels = nearByHotels.filter((h) => match.test(h.venue.name))
	    } else {
	      showingHotels = nearByHotels
	    }

	    showingHotels.sort(sortBy('venue.name'))
   		return(
   			<div className="sideMenu">
   				<div className="menuHeader">
   					<div className="logo">

   					</div>
   				</div>
		   		<div className="inputContainer">
		   			<input
		   				type="text"
		   				placeholder="Search a new Hotel"
		   				value={query}
            			onChange={(event) => this.updateQuery(event.target.value)}
            		/>
		   		</div>
		   		{showingHotels.length !== nearByHotels.length && (
					<div className='showing-hotels'>
						<span>Now showing {showingHotels.length} of {nearByHotels.length} total</span>
						<button onClick={this.clearQuery}>Show all</button>
					</div>
				)}
		   		<div className="listContainer">
					<ul className="listItems">
						{console.log(nearByHotels)}
						{showingHotels.map(h => (
							<li
								className="listHotels"
								key={h.venue.id}
								id={h.venue.id}
								onClick={() => displayMarker(h.venue.name)}
								>{h.venue.name}
							</li>
						))}
				    </ul>
		   		</div>
		   	</div>
   		)
	}
};

export default SideMenu;