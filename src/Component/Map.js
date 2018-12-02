import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker , InfoWindow } from 'react-google-maps';

class Map extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: false
		}
	}

	handleToggle = () => {
	   this.setState({
	       isOpen: !this.state.isOpen
	   })
	   console.log(this.state.isOpen)
	}

   	render() {
   		const { isOpen } = this.state
   		const { nearByHotels , focusedMarker} = this.props
	   	const GoogleMapExample = withGoogleMap(props => (
			<GoogleMap
			defaultCenter = { { lat: 28.7041 , lng: 77.1025 } }
			defaultZoom = { 12 }
			>
				{console.log(focusedMarker)}
				{focusedMarker.length && (
						<Marker position={{lat: focusedMarker[0].venue.location.lat, lng: focusedMarker[0].venue.location.lng }}>

						</Marker>
					)
				}
				{!focusedMarker.length && (
						this.props.nearByHotels.map(h => (
							<Marker position={{lat: h.venue.location.lat, lng: h.venue.location.lng }} onClick={this.handleToggle}>
								{isOpen &&
								<InfoWindow
					                key={h.venue.id}
					            >
					                <div>{h.venue.name}</div>
					            </InfoWindow> }
							</Marker>
						))
					)
			    }
			</GoogleMap>
		));
		return(
			<div style={{ height: `100%`}}>
				<GoogleMapExample
				  containerElement={ <div style={{ height: `100%`, width: '100%' }} /> }
				  mapElement={ <div style={{ height: `100%`, width: `100%`  }} /> }
				/>
			</div>
		);
	}
};

export default Map;