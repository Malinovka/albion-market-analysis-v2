export default function Checkbox (props) {

    return (
        <label>
            <input 
                type="checkbox" 
                name={props.name}
                value={props.value} 
                onChange={props.handleChange} 
                checked={props.isChecked}
            />
            {props.label}
        </label>
    )
}