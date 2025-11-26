import React, { useMemo, useState } from 'react'
import './style.css'

const debounce = (callback, delay) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            callback(...args)
        }, delay);
    }
}

const AutoComplete = ({suggestions, onChange, isLoading, debounceSupport}) => {
    const [query, setQuery] = useState('');
    const debounceFunc = useMemo(() => debounce(onChange, 500), []);
    const handleQuery = (e) => {
        let value = e.target.value;
        setQuery(value);
        checkDebounceSupport(value);
    }
    const checkDebounceSupport = (value) => {
        debounceSupport ? debounceFunc({ query: value, type: 'typing' }) :  onChange({ query: value, type: 'typing' });
    }
    const handleSelect = (value) => {
        setQuery(value);
        onChange({
            query: value,
            type: 'selected'
        })
    }
    const handleCancel = () => {
        return () => {
            setQuery('');
            onChange({
                query: '',
                type: 'cancel'
            })
        }
    }
    return (
        <div>
            <h1>
                AutoComplete
            </h1>
            <div className="wrapper">
                <div className="autocomplete">
                    <div className="search-bar">
                        <div className="input-field">
                            <input type="text" name="" value={query} onChange={(e) => handleQuery(e)}/>
                        </div>
                        <div className="cancel-btn">
                            <button onClick={handleCancel()}>X</button>
                        </div>
                    </div>

                    <div className="suggestions">
                        {
                            query && !isLoading && suggestions && suggestions?.map((suggestion) => {
                                return <div className="suggestion-list" data-selected={query?.toLowerCase() == suggestion?.toLowerCase()} key={suggestion} onClick={() => handleSelect(suggestion)}>
                                    {suggestion}
                                </div>
                            })
                        }
                        {
                            isLoading && <div className='suggestion-loader'>
                                loading...
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AutoComplete