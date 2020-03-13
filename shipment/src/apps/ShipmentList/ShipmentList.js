import React, { Component } from 'react';
import './ShipmentList.css';
// import axios from '../../config/axios';
// import Config from '../../config/config';
import Shipment from '../Shipment/Shipment';
// import Config from './config/config';


class ShipmentList extends Component {
  
  state = {
    hasError: false,
    hasSuccess: false,
    error: {
      message: ''
    },
    list: [],
    currentPage: 1,
    totalPage: 0,
  }

  /* constructor(props) {
    super(props);    
  } */

  updateLocalState(newState, callback = () => { }) {
    this.setState(newState, callback);
  }
  
  getShipmentList(data) {
    // const start = (this.props.currentPage - 1) * Config.recordsPerPage;
    // const pageList = data.slice(start, Config.recordsPerPage);
    // console.log(this.state, start, list);

    let currentPageList = data.map((shipment) => {
      return <Shipment key={shipment.id} shipment={shipment} />;
    });

    // console.log(currentPageList);
    return currentPageList;
  }

  render() {
    let currentList = this.getShipmentList(this.props.data);   

    return (
      <div>
        {currentList}
      </div>
    );
  }
}

export default ShipmentList;
