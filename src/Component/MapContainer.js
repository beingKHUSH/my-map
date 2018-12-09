import {
  Map, Marker,
  InfoWindow,
  GoogleApiWrapper
} from 'google-maps-react'
import React, { Component } from 'react'
import escapeRegExp from 'escape-string-regexp';


//Exports the Map and the markers
export class MapContainer extends Component {
	state = {
		activeMaker: {},
		selectedPlace: {},
		showingInfoWindow: false
	}

	//Component will re render
	componentDidMount() {
		this.forceUpdate()
	}

	//Action what happens when the marker is clicked
	onMarkerClick = (props, marker, e) => {
		this.setState({
		  selectedPlace: props,
		  activeMaker: marker,
		  showingInfoWindow: true
		})
	}

	//Action what happens when the map is clicked
	onMapClick = () => {
		this.setState({
		  activeMaker: {},
		  selectedPlace: {},
		  showingInfoWindow: false
		})
	}


	render() {
	  	const { queryText, locations} = this.props
	    const reg = new RegExp(escapeRegExp(queryText).toLowerCase().trim())
	    const bound = new this.props.google.maps.LatLngBounds()
	    let iconMarker = new window.google.maps.MarkerImage(
            "https://image.flaticon.com/icons/svg/1244/1244505.svg",
            null, /* size is determined at runtime */
            null, /* origin is 0,0 */
            null, /* anchor is bottom center of the scaled image */
            new window.google.maps.Size(32, 32)
        );
	    for (let i = 0; i < locations.length; i++) {
	      bound.extend(locations[i].position)
	    }
	    return (
	      	<Map
	        role="application"
	        onClick={this.onMapClick}
	        initialCenter={{ lat: 34.9003, lng: 33.6232}}
	        google={this.props.google}
	        bounds={bound}>
					{locations.filter(location => {
						return reg.test(location.title.toLowerCase())
					})
		          // Print the ones that was filtered out
		            .map(location => {
			            return (
			              <Marker
			                icon={iconMarker}
			                key={location.id}
			                position={{ lat: location.position.lat, lng: location.position.lng}}
			                title={location.title}
			                onClick={this.onMarkerClick}
			                animation={this.props.google.maps.Animation.Fo}
			                category={location.category}
			                address={location.address}
			                />
			            )
		            }
		        )}

				<InfoWindow className="InfoWin" marker={this.state.activeMaker} visible={this.state.showingInfoWindow}>
				<body>
					<header>
						<h1>{this.state.selectedPlace.title}</h1>
						<h3><span aria-labelledby="category">Category</span>: <span id="category">{!this.state.selectedPlace.category ? 'N/A' : this.state.selectedPlace.category}</span></h3>
					</header>
					<main>
						<ul>
						  <li><span aria-labelledby="place-address">Address</span>: <span id="place-address">{!this.state.selectedPlace.address ? 'N/A' : this.state.selectedPlace.address}</span></li>
						  <li><span aria-labelledby="place-state">State</span>: <span id="place-state">{!this.state.selectedPlace.state ? 'N/A' : this.state.selectedPlace.state}</span></li>
						  <li><span aria-labelledby="place-coordinates">Coordinates</span>: <span id="place-coords">{this.state.selectedPlace.coordinates}</span></li>
						</ul>
					</main>
				</body>
				</InfoWindow>
	        </Map>
	    )
    }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyB3fJP5YSO36i6qdEHfFTnA4G_dtervm5U'
})(MapContainer)