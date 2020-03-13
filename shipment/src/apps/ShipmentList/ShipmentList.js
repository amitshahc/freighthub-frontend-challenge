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
    let currentPageList = data.map((shipment) => {
      return <Shipment key={shipment.id} shipment={shipment} />;
    });

    return currentPageList;
  }

  render() {
    let currentList = this.getShipmentList(this.props.data);   

    return (
      <div>
        <table className="table table-hover table-stripped">
          <thead>
            <tr>
              <th>id</th>
            </tr>
          </thead>
          <tbody>
            {currentList}    
          </tbody>          
        </table>        
      </div>
    );
  }
}

export default ShipmentList;
