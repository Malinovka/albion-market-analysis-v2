import Checkbox from './Checkbox'
import Button from './Button';
import React, { useState } from 'react'

export default function Filter(props) {
    const { BuyFrom, SellTo } = props.currentCheckedLocations;
    const { locationsList } = props
    const [rerender, setRerender] = useState(false);
    const [checkedLocations, setCheckedLocations] = useState({BuyFrom: BuyFrom, SellTo: SellTo});
    
    const toggleCheck = e => {
        const { name, value } = e.target;
        let newChecked = checkedLocations;
        if (newChecked[name].includes(value) || newChecked[name].includes('*')) {
            newChecked[name] = newChecked[name].filter(item => item !== value && item !== '*');
        }
        else {
            newChecked[name].push(value);
        }
        setCheckedLocations(newChecked);
        setRerender(!rerender);
    };
    
    const handleSelectAll = e => {
        const { name, checked } = e.target;
        let newChecked = checkedLocations;
        if (!checked) {
            newChecked[name] = [];
        }
        else {
            newChecked[name] = locationsList;
        }
        setCheckedLocations(newChecked);
        setRerender(!rerender);
    }

    return (
        <form className="filter-locations" onSubmit={(e) => props.handleSubmit(e, checkedLocations)}>
            <fieldset form="filter-locations">
                <legend>
                    Buy Locations
                </legend>
                <Checkbox
                    name="BuyFrom"
                    label="Select All"
                    isChecked={checkedLocations.BuyFrom.length === locationsList.length}
                    handleChange={handleSelectAll}
                />
                <div className='locationList'> 
                    {locationsList.map((loc) => 
                        <Checkbox 
                            key={loc} 
                            name="BuyFrom"
                            label={loc}
                            value={loc} 
                            isChecked={checkedLocations.BuyFrom.includes(loc)}
                            handleChange={toggleCheck}
                        />
                    )}
                </div>
            </fieldset>
            <fieldset form="filter-locations">
            <legend>
                    Sell Locations
                </legend>
                <Checkbox
                    name="SellTo"
                    label="Select All"
                    isChecked={checkedLocations.SellTo.length === locationsList.length}
                    handleChange={handleSelectAll}
                />
                <div className='locationList'> 
                    {locationsList.map((loc) => 
                        <Checkbox 
                            key={loc} 
                            name="SellTo"
                            label={loc}
                            value={loc} 
                            isChecked={checkedLocations.SellTo.includes(loc)}
                            handleChange={toggleCheck}
                        />
                    )}
                </div>
            </fieldset>
            <div className='form-buttons'>
                <Button handleClick={props.handleClose}>Cancel</Button>
                <button type='submit'>Apply</button>
            </div>
        </form>
    )
}