import React from 'react';
import './Shipment';

const Shipment = (props) => {
    return (
        <div>
            {props.shipment.name}
        </div>
    );
};

export default Shipment;