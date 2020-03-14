import React from 'react';

const SearchInput = (props) => {

    return (
        <div>
            <input type='text' name={props.name} id={props.id} placeholder={props.placeholder}
                onChange={props.onChange}
            />
        </div>
    );
};

export default SearchInput;