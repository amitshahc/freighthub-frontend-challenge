import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Table from 'react-bootstrap/Table';

const Shipment = (props) => {

  let orderedIcon = (heading) => {
    if (props.ordered.key === heading.key) {
      return props.ordered.isAsc ? <FontAwesomeIcon icon="angle-down" /> : <FontAwesomeIcon icon="angle-up" />;
    }
    return null;
  }
  
    const headings = props.thead.map((heading) => {
        return <th key={heading.key} className={`${heading.class}`}>
          {orderedIcon(heading)}
          <a href="/" onClick={(event) => { props.orderByClicked(event, heading.key) }} className="mx-2">
            {heading.title}
          </a>
        </th>;
    });

    return (
      // <table className="table table-hover table-striped">  
      <Table hover striped size="sm" responsive>
          <thead>
            <tr>
                {headings}
            </tr>
          </thead>
          <tbody>
            {props.children}    
          </tbody>          
      </Table>
    );
};

export default Shipment;