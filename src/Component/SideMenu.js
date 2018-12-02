import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

class SideMenu extends Component {
   	render() {
   		return(
   			<div className="sideMenu">
   				<div className="menuHeader">
   					<div className="logo">

   					</div>
   				</div>
		   		<div className="inputContainer">
		   			<input type="text" placeholder="Search a new Hotel"/>
		   		</div>
		   		<div className="listContainer">
					<ul className="listItems">
						{console.log(this.props.nearByHotels)}
						{this.props.nearByHotels.map(h => (
							<li
								className="listHotels"
								key={h.venue.id}
								id={h.venue.id}
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