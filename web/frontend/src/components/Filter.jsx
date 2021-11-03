import Checkbox from './Checkbox'
import Button from './Button';

export default function Filter(props) {
    
    const { checkedLocations } = props;
    const locations = ['Thetford',"Morgana's Rest","Lymhurst","Forest Cross","Merlyn's Rest","Bridgewatch","Highland Cross","Black Market","Martlock","Caerleon","Fort Sterling","Arthur's Rest"]

    return (
        <form id="filter-locations" onSubmit={props.handleSubmit}>
            <fieldset form="filter-locations">
                <legend>Buy Locations</legend>
                <div className='locationList'> 
                    {locations.map((loc) => 
                        <Checkbox 
                            key={loc} 
                            name="buy"
                            label={loc}
                            value={loc} 
                            isChecked={checkedLocations.buy.has(loc)}
                        />
                    )}
                </div>
            </fieldset>
            <fieldset form="filter-locations">
                <legend>Sell Locations</legend>
                <div className='locationList'> 
                    {locations.map((loc) => 
                        <Checkbox 
                            key={loc} 
                            name="sell"
                            label={loc}
                            value={loc} 
                            isChecked={checkedLocations.sell.has(loc)}
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