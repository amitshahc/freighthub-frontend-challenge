import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import ShipmentList from './apps/ShipmentList/ShipmentList';
import axios from './config/axios';
import Config from './config/config';
import ReactPaginate from 'react-paginate';
import 'bootstrap/dist/css/bootstrap.min.css';
// import $ from 'jquery';

window.React = React;

class App extends Component {
  
  state = {
    hasError: false,
    hasSuccess: false,
    error: {
      message: ''
    },
    master_data: [],    
    filtered_data: [],
    display_data: [],
    offset: 0,
    pageCount: 0,
    orderBy: "id",
    orderAsc: true
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
        // console.log(response);
        
        let newState = {};
        newState.master_data = response.data;
        newState.filtered_data = response.data;
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
    let selected = data.selected || this.state.offset;
    let offset = Math.ceil(selected * Config.recordsPerPage);

    let display_data = this.state.filtered_data.slice(offset, offset + Config.recordsPerPage);
    
    this.updateLocalState({ display_data: display_data });
  }

  handleOrderByClick(key){
    // console.log(key, this.state);return;
    if(this.state.orderBy === key){
      this.updateLocalState({orderAsc: !this.state.orderAsc});
    }
    else{
      this.updateLocalState({orderBy: key, orderAsc: true});      
    }

    let data = this.state.filtered_data.sort((a,b) => {
      if(a[key] < b[key]) { return this.state.orderAsc ? -1 : 1; }
      if(a[key] > b[key]) { return this.state.orderAsc? 1 : -1; }
      return 0;
    });

    this.updateLocalState({filtered_data: data}, this.handlePageClick({}));
  }
  
  render() {
    return (
      <div>
      <ReactPaginate
          previousLabel={' <Previous '}
          nextLabel={' Next> '}
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
        <ShipmentList data={this.state.display_data} orderBy={this.handleOrderByClick.bind(this)} />
      </div>
    );  
  }  
}

export default App;
