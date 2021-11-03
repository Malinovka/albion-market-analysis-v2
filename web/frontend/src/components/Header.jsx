import Button from './Button';
import Language from './Language';
import About from './About';
import React, { useState } from 'react'

export default function Header(props) {
    const [showAbout, toggleAbout] = useState(false);

    return (
        <header>
            <Button handleClick={() => toggleAbout(!showAbout)}>About</Button>
            <Language selectedLang={props.lang} handleChange={props.changeLang}/>
            {showAbout && <About handleExit={() => toggleAbout(!showAbout)}/>}
        </header>
    );
}