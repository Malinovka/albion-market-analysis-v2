import Button from "./Button"

export default function About(props) {
    return (
        <div className='modal'>
            <div className='about'>
                <Button className='close-btn' handleClick={props.handleExit}>X</Button>
                <h4>Real time market analysis for Albion Online</h4>
                <p>We calculate the most profitable trades currently on the market, 
                all you have to do is buy from one location and sell to another for maximum profit.</p>
                <p>Made possible thanks to the Albion Data Project. 
                Want the most up to date deals? Download their client! 
                The more data we have, the more accurate our tool is.</p>
            </div>
        </div>
    )
}