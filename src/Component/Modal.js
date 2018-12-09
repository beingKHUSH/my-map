import React, { Component } from 'react';

class Modal extends Component {
  render() {
    const { venueInfo , closeModal } = this.props
    return (
      <div className="details-modal">
        <button
          onClick={closeModal}
          className="close-modal"
          aria-label="Close details window">X</button>
        <h1><span aria-labelledby="place-title"></span>{venueInfo.title}</h1>
        <h3><span aria-labelledby="place-category">Category</span>: <span className="data" id="place-category">{!venueInfo.category ? 'N/A' : venueInfo.category}</span></h3>
        <ul key={venueInfo.id}>
          <li><span aria-labelledby="place-address">Address</span>: <span className="data" id="place-address">{!venueInfo.address ? 'N/A' : venueInfo.address}</span></li>
          <li><span aria-labelledby="place-state">State</span>: <span className="data" id="place-state">{!venueInfo.state ? 'N/A' : venueInfo.state}</span></li>
        </ul>
        <br/>
      </div>
    )
  }
}

export default Modal;