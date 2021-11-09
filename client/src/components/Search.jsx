import React, { useState } from 'react';

export default function Search(props) {
    const [value, setValue] = useState(props.search);

    const handleChange = (e) => {
        setValue(e.target.value);
    }

    return(
        <form onSubmit={(e) => props.handleSubmit(e, value)}>
            <input 
                onChange={handleChange}
                value={value}
                type="text"
                className="item-search"
                placeholder="Search Items..."
                name="search"
                autoComplete='off'
            />
            <button type="submit">Search</button>
        </form>
    )
}