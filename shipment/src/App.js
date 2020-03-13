import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import ShipmentList from './apps/ShipmentList/ShipmentList';
import axios from './config/axios';
import Config from './config/config';
import ReactPaginate from 'react-paginate';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';

window.React = React;

class App extends Component {
  
  state = {
    hasError: false,
    hasSuccess: false,
    error: {
      message: ''
    },
    data: [],
    filtered: [],
    offset: 1,
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
        newState.data = response.data;
        newState.pageCount = Math.ceil(response.data.length / Config.recordsPerPage);

        this.updateLocalState(newState, () => {
          this.handlePageClick({});
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  handlePageClick = (data) => {
    let selected = data.selected || 0;
    let offset = Math.ceil(selected * Config.recordsPerPage);    
    let filtered = this.state.data.slice(offset, offset +Config.recordsPerPage);
    
    this.updateLocalState({ filtered: filtered });
  }
  
  render() {
    return (
      <div>
      <ShipmentList data={this.state.filtered} />
      <ReactPaginate
          previousLabel={'<'}
          nextLabel={'>'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={this.state.pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
      />
      </div>
    );  
  }  
}

export default App;
