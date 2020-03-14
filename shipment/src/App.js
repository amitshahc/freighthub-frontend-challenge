import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import ShipmentList from './apps/ShipmentList/ShipmentList';
import axios from './config/axios';
import Config from './config/config';
import ReactPaginate from 'react-paginate';
import SearchInput from './layouts/SearchInput';
import { library } from '@fortawesome/fontawesome-svg-core';
// import { fab } from '@fortawesome/free-brands-svg-icons'
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from './layouts/Alert';
// import 'bootstrap/dist/css/bootstrap.min.css';


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
    display_data: null,
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
        // console.error(error);
        this.updateLocalState({ hasError: true, hasSuccess: false, error: { message: error.message } });
      });
  }

  handlePageClick = (data) => {
    let selected = data.selected || this.state.offset;
    let offset = Math.ceil(selected * Config.recordsPerPage);
    // console.log(offset);
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
    let key = this.state.order.key;
    let data = this.state.filtered_data.sort((a, b) => {
      
      a = (key === 'total') ? parseFloat(a[key]) : a[key];
      b = (key === 'total') ? parseFloat(b[key]) : b[key];

      let isAsc = this.state.order.isAsc;
      if(a < b) { return isAsc ? -1 : 1; }
      if(a > b) { return isAsc? 1 : -1; }
      return 0;
    });

    this.updateLocalState({filtered_data: data}, this.handlePageClick({}));
  }
  
  render() {
    return (
      <Container fluid>
        <Row>
          <Col>
            <div>
              <div className="d-flex justify-content-between m-y-2">
                <SearchInput
                  placeholder='Search by Id' name='search_id' id='search-id'
                  onChange={this.handleSearch.bind(this)}
                />

                {this.state.pageCount > 0 &&
                  <ReactPaginate
                    previousLabel={' < Previous '}
                    nextLabel={' Next > '}
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
                }
              </div>

              {!!this.state.display_data &&
                <ShipmentList
                  data={this.state.display_data}
                  orderByClicked={this.handleOrderByClick.bind(this)}
                  ordered={this.state.order}
                />
              }

              {!this.state.display_data && !this.state.hasError &&
                <Alert type="info">Loading...</Alert>
              }

              {!!this.state.hasError &&
                <Alert type="danger">{this.state.error.message}</Alert>
              }

              </div>
          </Col>
      </Row>
    </Container>
    );  
  }  
}

export default App;
