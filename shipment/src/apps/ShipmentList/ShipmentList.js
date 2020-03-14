import React, { Component } from 'react';
import './ShipmentList.css';
// import axios from '../../config/axios';
// import Config from '../../config/config';
import Shipment from '../Shipment/Shipment';
// import Config from './config/config';
import Table from '../../layouts/Table';
import Alert from '../../layouts/Alert';

class ShipmentList extends Component {
  
  thead = [
    {key: "id", title: "#Id", class:"text-left"},
    {key: "name", title: "Name", class:"text-left"},
    {key: "mode", title: "Mode", class:"text-left"},
    {key: "origin", title: "Origin", class:"text-left"},
    {key: "destination", title: "Destination", class:"text-left"},
    {key: "total", title: "Total", class:"text-right"}
  ];
    

  /* constructor(props) {
    super(props);    
  } */

  updateLocalState(newState, callback = () => { }) {
    this.setState(newState, callback);
  }
  
  getShipmentList(data) {
    let currentPageList = data.map((shipment) => {
      return <Shipment key={shipment.id} shipment={shipment} />;
    });

    return currentPageList;
  } 

  render() {
    let currentList = this.getShipmentList(this.props.data);   

    return (
      <div id="shipment-list">
        {currentList.length > 0 &&
          <Table thead={this.thead} ordered={this.props.ordered} orderByClicked={this.props.orderByClicked}>{currentList}</Table>
        }
        {currentList.length === 0 &&
          <Alert type="danger">No record found</Alert> 
        }
      </div>
    );
  }
}

export default ShipmentList;
