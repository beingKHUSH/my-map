import React, { Component } from 'react';
import './App.css';
import Map from './Component/MapContainer.js';
import SideMenu from './Component/SideMenu.js';
import MenuButton from './Component/MenuButton';
import Modal from './Component/Modal';
import axios from 'axios';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hotels: [],
		    venueInfo: {},
		    query: ''
		}
	}

    componentDidMount() {
    	this.getVenues()
		document.addEventListener('keyup', e => {
			e.preventDefault()
			//escape button will close the sidebar
			if (e.keyCode === 13) {
				document.querySelector('.sidebar')
				.classList.toggle('sidebar-expanded')

				document.querySelector('.menu-btn')
				.classList.toggle('menu-btn-hidden')
			}
    	})
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
			const locations = response.data.response.groups[0].items.map(item => {
		        return {
		          position: { lat: item.venue.location.lat, lng: item.venue.location.lng },
		          title: item.venue.name,
		          id: item.venue.id,
		          category: item.venue.categories[0].name,
		          address: item.venue.location.address,
		          state: item.venue.location.state,
		          coordinates: item.venue.location.lat + ', ' + item.venue.location.lng,
		        }
	        })
			this.setState({
				hotels: locations
			})
		}).catch(error => {
			console.log("ERROR! "+ error)
		})
	}

	menuBtnHandler = e => {
		// Hides menu button
		e.target.classList.add('menu-btn-hidden')

		// display the sidebar
		document.querySelector('.sidebar')
		  .classList.add('sidebar-expanded')
	}

    //closes the sidebar
	closeBtnHandler = e => {
		document.querySelector('.sidebar')
		  .classList.remove('sidebar-expanded')
		 //shows menu button
		document.querySelector('.menu-btn')
		  .classList.remove('menu-btn-hidden')
	}

	sidebarItemClick = e => {
	// removes markers that are not a match
		this.setState({
		  query: e.target.textContent.replace(/- /g, '')
		})

		const modal = document.querySelector('.details-modal')
		// Search for the clicked hotel and retrieve the data
		this.state.hotels.map( h => {
			if (h.title === e.target.textContent.replace(/- /g, '')) {
				console.log(h)
				this.setState({ venueInfo: h })
				modal.style.display = 'block'
				modal.style.opacity = '1'
			}
		})
	}

	sidebarInputClick = e => {
		this.setState({
		  query: ''
		})
		//pop-up modal when the hotel is clicked in the search bar
		const modal = document.querySelector('.details-modal')

		modal.style.opacity = '0'

		setTimeout(() => {
		  modal.style.display = 'none'
		}, 500)
	}

	sidebarItemKeyUp = e => {
		if (e.keyCode === 13) {
		  this.setState({
		    query: e.target.textContent.replace(/- /g, '')
		  })
		}
	}
		//closes the modal
	modalCloseButton = e => {
		const modal = document.querySelector('.details-modal')

		modal.style.opacity = '0'
		setTimeout(() => {
		  modal.style.display = 'none'
		}, 500)
	}

	updateQuery = e => {
		this.setState({
			query: e.target.value
		})
	}

	render() {
	    return (
	    	<div className="App">
				<MenuButton
					onMenuClick={this.menuBtnHandler} />

				<Modal
				  venueInfo={this.state.venueInfo}
				  closeModal={this.modalCloseButton} />

				<SideMenu
				  onCloseClick={this.closeBtnHandler}
				  places={this.state.hotels}
				  currentQuery={this.state.query}
				  onQueryInput={this.updateQuery}
				  onItemClick={this.sidebarItemClick}
				  onInputClick={this.sidebarInputClick}
				  onItemFocus={this.sidebarItemFocus}
				  onItemKeyUp={this.sidebarItemKeyUp} />

				<div className="map">
					<Map
					queryText={this.state.query}
					locations={this.state.hotels} />
				</div>
			</div>
	    )
  	}
}

export default App;