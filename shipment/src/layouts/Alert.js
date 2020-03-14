import React from 'react';

const Alert = (props) => {

    return (
        <div className={`alert alert-${props.type} my-2`}>
            {props.children}
        </div>
    );
};

export default Alert;