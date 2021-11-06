import Button from "./Button"

export default function About(props) {
    return (
        <div className='about-overlay'>
            <Button className='close-btn' handleClick={props.handleExit}>X</Button>
            <h1>Albion Sniper Market Analysis</h1>
            <hr/>
            <p>Made possible thanks to the Albion Data Project. 
            Want the most up to date deals? Download their client! 
            The more data we have, the more accurate our tool is.</p>
            <br/>
            
        </div>
    )
}