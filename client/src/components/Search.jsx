import React, { useState, useEffect } from 'react';

export default function Search(props) {
    const [value, setValue] = useState(props.search);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [suggestions, setSuggestions] = useState([]);

    const baseURL = '/api/items';
    const params = new URLSearchParams({'search': value});

    const handleSuggestion = (e, item) => {
        setValue(item.LocalizedNames[props.lang]);
        setShowSuggestions(false);
        props.handleSubmit(e, item.LocalizedNames[props.lang]);
    }

    useEffect(() => {
        if (value) {
            params.set('search', value);
            params.set('lang', props.lang)
            fetch(baseURL + '?' + params)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw response;
                })
            .then(data => {
                setSuggestions(data);
            })
            .catch(console.error)
        }
    }, [value])

    return(
        <form onSubmit={(e) => props.handleSubmit(e, value)}>
            <input 
                onChange={(e) => setValue(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                value={value}
                type="search"
                className="item-search"
                placeholder="Search Items..."
                name="search"
                autoComplete='off'
            />
            
            {value && showSuggestions && <ul className='suggestions'>
                {suggestions.map((item) => 
                    <li 
                        className='suggestion' 
                        onClick={(e) => handleSuggestion(e, item)}
                        key={item._id}>
                            {item.LocalizedNames[props.lang]}
                    </li>)}
            </ul>}
            <button type="submit">Search</button>
        </form>
    )
}