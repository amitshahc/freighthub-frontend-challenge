import React from 'react';
import './Shipment';

const Shipment = (props) => {
    return (
        <tr>
            <td>{props.shipment.id}</td>
            <td>{props.shipment.name}</td>
            <td>{props.shipment.mode}</td>
        </tr>
    );
};

export default Shipment;