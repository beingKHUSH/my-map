import React, { Component } from 'react';
import './App.css';
import Map from './Component/Map.js';
import SideMenu from './Component/SideMenu.js';
import axios from 'axios';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hotels: [],
			focusedMarker: []
		}
	}

	componentDidMount() {
	    this.getVenues()
	}

	getVenues = () => {
	    const endPoint = "https://api.foursquare.com/v2/venues/explore?"
	    const parameters = {
			client_id: "ML0RA0EONGHAF30E5FDWX4YKPS42XJ1JM1X0B003S4XGTNOP",
			client_secret:"SE2SYNM5IP4WJ1ODXVGC4QRZ3MQXEQIC240J1A1DQQK2FIER",
			query:"hotel",
			near:"Delhi",
			v: "20182411"
	    }

	    axios.get(endPoint + new URLSearchParams(parameters))
		.then(response => {
			this.setState({
				hotels: response.data.response.groups[0].items
			})
		}).catch(error => {
			console.log("ERROR! "+ error)
		})
	}

	showMarker = (hotelName) => {
		let focusedMarker
		focusedMarker = this.state.hotels.filter(h => h.venue.name === hotelName)
		this.setState({
			focusedMarker: focusedMarker
		})
	}

	render() {
	    return (
			<div className="App">
				<div className="SideMenuSection" style={{width: '20%' , height: '100vh'}}>
					<SideMenu nearByHotels={this.state.hotels} displayMarker={this.showMarker.bind(this)}/>
				</div>
				<div className="MapSection" style={{width: '80%' , height: '100vh'}}>
					<Map nearByHotels={this.state.hotels} focusedMarker={this.state.focusedMarker
					}/>
				</div>
			</div>
	    );
  	}
}

export default App;