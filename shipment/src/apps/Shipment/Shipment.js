import React from 'react';
import './Shipment';

const Shipment = (props) => {
    return (
        <tr>
            <td>{props.shipment.id}</td>
            <td>{props.shipment.name}</td>
            <td>{props.shipment.mode}</td>
            <td>{props.shipment.origin}</td>
            <td>{props.shipment.destination}</td>
            <td className="text-right">{props.shipment.total}</td>
        </tr>
    );
};

export default Shipment;