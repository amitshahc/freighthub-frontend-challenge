import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Shipment = (props) => {

  let orderedIcon = (heading) => {
    if (props.ordered.key === heading.key) {
      return props.ordered.isAsc ? <FontAwesomeIcon icon="angle-down" /> : <FontAwesomeIcon icon="angle-up" />;
    }
    return null;
  }
  
    const headings = props.thead.map((heading) => {
        return <th key={heading.key}>
          <a href="javascript:void(0);" onClick={() => props.orderByClicked(heading.key)}>
            {heading.title}            
          </a>
          {orderedIcon(heading)}          
        </th>;
    });

    return (
        <table className="table table-hover table-stripped">
          <thead>
            <tr>
                {headings}
            </tr>
          </thead>
          <tbody>
            {props.children}    
          </tbody>          
        </table>
    );
};

export default Shipment;