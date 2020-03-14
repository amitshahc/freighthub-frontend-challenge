import React from 'react';
import './Shipment';
import { PropTypes } from 'prop-types';

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

Shipment.propTypes = {
    shipment: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        mode: PropTypes.string,
        origin: PropTypes.string,
        destination: PropTypes.string,
        total: PropTypes.string,
    })
}
export default Shipment;