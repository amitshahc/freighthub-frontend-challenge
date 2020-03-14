import React from 'react';

const Shipment = (props) => {

  let orderedIcon = (heading) => {
    if (props.ordered.key === heading.key) {
      return props.ordered.isAsc ? "Asc" : "Dsc";
    }
    return null;
  }
  
    const headings = props.thead.map((heading) => {
        return <th key={heading.key}>
          <a href="javascript:void(0);" onClick={() => props.orderByClicked(heading.key)}>
            {heading.title}
            {orderedIcon(heading)}
          </a>
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