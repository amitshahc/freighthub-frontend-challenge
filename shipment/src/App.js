import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import ShipmentList from './apps/ShipmentList/ShipmentList';
import axios from './config/axios';
import Config from './config/config';

class App extends Component {
  
  state = {
    hasError: false,
    hasSuccess: false,
    error: {
      message: ''
    },
    list: [],
    currentPage: 1,
    pageCount: 0,
  }
  
  componentDidMount() {
    this.getShipments();
  }

  updateLocalState(newState, callback = () => { }) {
    this.setState(newState, callback);
  }

  getShipments() {
    axios.get('/shipments')
      .then((response) => {
        console.log(response);
        
        let newState = {};
        newState.list = response.data;
        newState.pageCount = Math.ceil(response.data.length / Config.recordsPerPage);

        this.updateLocalState(newState);
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    return (
      <ShipmentList data={this.state.list} currentPage={this.state.currentPage} pageCount={this.state.pageCount} />
    );  
  }  
}

export default App;
