import React, { Component } from 'react';
import './ShipmentList.css';
// import axios from '../../config/axios';
// import Config from '../../config/config';
import Shipment from '../Shipment/Shipment';
// import Config from './config/config';
import Table from '../../layouts/Table';


class ShipmentList extends Component {
  
  /* state = {
    hasError: false,
    hasSuccess: false,
    error: {
      message: ''
    },
    list: [],
    currentPage: 1,
    totalPage: 0    
  } */

  thead = [
    {key: "id", title: "#Id"},
    {key: "name", title: "Name"},
    {key: "mode", title: "Mode"}
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
      <div>
        <Table thead={this.thead} orderBy={this.props.orderBy}>{currentList}</Table>
      </div>
    );
  }
}

export default ShipmentList;
