import Button from "./Button"
import img from '../imgs/gold.png'

export default function About(props) {
    return (
        <div className='modal'>
            <div className='about'>
                <Button className='close-btn' handleClick={props.handleExit}>X</Button>
                <div className='about-title'><h4>Real-time market analysis for Albion Online</h4></div>
                    <div className='about-content'>
                    <img src={img}/>
                        <p>We calculate the most profitable trades on the market, 
                        all you have to do is buy from one location and sell to another for maximum profit.</p>
                        <p>Made possible thanks to the <a href='https://www.albion-online-data.com/' target='_blank'>Albion Online Data Project</a>. 
                        Want the most up to date deals? Download their client! 
                        The more data we have, the more accurate our tool is.</p>
                        <p>Want to follow this project? <a href='https://github.com/Malinovka/albion-market-analysis-v2' target='_blank'>Check it out on GitHub</a>.</p>
                        
                </div>
            </div>
        </div>
    )
}