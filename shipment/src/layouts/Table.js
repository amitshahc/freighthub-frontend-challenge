import React from 'react';

const Shipment = (props) => {
    const headings = props.thead.map((heading) => {
        return <th key={heading.key}>
            <a href="javascript:void(0);" onClick={() => props.orderBy(heading.key)}>{heading.title}</a>
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