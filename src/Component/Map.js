import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

class Map extends Component {
   	render() {
	   	const GoogleMapExample = withGoogleMap(props => (
			<GoogleMap
			defaultCenter = { { lat: 29.0588, lng: 76.0856 } }
			defaultZoom = { 12 }
			>
				<Marker position={{lat: 29.0588, lng: 76.0856}}></Marker>
			</GoogleMap>
		));
		return(
			<div>
				<GoogleMapExample
				  containerElement={ <div style={{ height: `100vh`, width: '100vw' }} /> }
				  mapElement={ <div style={{ height: `100%`, width: `100%`  }} /> }
				/>
			</div>
		);
	}
};

export default Map;