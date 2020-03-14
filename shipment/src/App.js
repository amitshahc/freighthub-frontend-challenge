import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import ShipmentList from './apps/ShipmentList/ShipmentList';
import axios from './config/axios';
import Config from './config/config';
import ReactPaginate from 'react-paginate';
import SearchInput from './layouts/SearchInput';
import { library } from '@fortawesome/fontawesome-svg-core'
// import { fab } from '@fortawesome/free-brands-svg-icons'
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons'

library.add(faAngleUp, faAngleDown);

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
    curruntPage: 0,
    order: {
      key: "id",
      isAsc: true 
    }    
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
    console.log(offset);
    let display_data = this.state.filtered_data.slice(offset, offset + Config.recordsPerPage);
    
    this.updateLocalState({ curruntPage: selected, display_data: display_data });
  }

  handleOrderByClick(event, key) {
    event.preventDefault();
    // console.log(key, this.state);return;
    let isAsc = this.state.order.isAsc;
    if (this.state.order.key === key) {
      isAsc = !this.state.order.isAsc;      
    }
    this.updateLocalState({ order: { key: key, isAsc: isAsc } }, this.reorder);
  }

  handleSearch(e) {
    let id = e.target.value;
    let data = this.state.master_data.filter((item) => {
      return item.id.indexOf(id) > -1;
    });
    // console.dir(data);
    let pageCount = Math.ceil(data.length / Config.recordsPerPage);
    this.updateLocalState({ filtered_data: data, pageCount: pageCount }, this.reorder);
  }

  reorder() {
    let key = this.state.order.key; console.log(key);
    let data = this.state.filtered_data.sort((a, b) => {
      let isAsc = this.state.order.isAsc;
      if(a[key] < b[key]) { return isAsc ? -1 : 1; }
      if(a[key] > b[key]) { return isAsc? 1 : -1; }
      return 0;
    });

    this.updateLocalState({filtered_data: data}, this.handlePageClick({}));
  }
  
  render() {
    return (
      <div>
        <div className="d-flex">
        <ReactPaginate
            previousLabel={' <Previous | '}
            nextLabel={' | Next> '}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={this.state.pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageClick}
            containerClassName={'pagination'}
            subContainerClassName={'pages pagination'}
            activeClassName={'active'}
            forcePage={this.state.curruntPage}
          />
        <SearchInput placeholder='Search' name='search_id' id='search-id' onChange={this.handleSearch.bind(this)} />
        </div>
        <ShipmentList
          data={this.state.display_data}
          orderByClicked={this.handleOrderByClick.bind(this)}
          ordered={this.state.order} />
      </div>
    );  
  }  
}

export default App;
