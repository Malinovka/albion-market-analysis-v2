import React, { useState } from 'react';

export default function Checkbox (props) {
    const [checked, toggleChecked] = useState(props.isChecked)

    return (
        <label>
            <input 
                type="checkbox" 
                name={props.name}
                value={props.label} 
                onChange={() => toggleChecked(!checked)} 
                checked={checked}
            />
            {props.label}
        </label>
    )
}