import React from 'react';

const SearchInput = (props) => {

    return (
        <div className="mt-3">
            <input type='text' name={props.name} id={props.id} placeholder={props.placeholder}
                onChange={props.onChange}
            />
        </div>
    );
};

export default SearchInput;