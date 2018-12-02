import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

class Map extends Component {
   	render() {
   		const { nearByHotels , focusedMarker} = this.props
	   	const GoogleMapExample = withGoogleMap(props => (
			<GoogleMap
			defaultCenter = { { lat: 28.7041 , lng: 77.1025 } }
			defaultZoom = { 12 }
			>
				{console.log(focusedMarker)}
				{focusedMarker.length && (
						<Marker position={{lat: focusedMarker[0].venue.location.lat, lng: focusedMarker[0].venue.location.lng }}></Marker>
					)
				}
				{!focusedMarker.length && (
						this.props.nearByHotels.map(h => (
							<Marker position={{lat: h.venue.location.lat, lng: h.venue.location.lng }}></Marker>
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