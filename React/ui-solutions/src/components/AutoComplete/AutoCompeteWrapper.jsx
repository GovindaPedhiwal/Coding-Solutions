import React, { useState } from 'react'
import AutoComplete from './AutoComplete'

const AutoCompeteWrapper = () => {
    const data = ['First', 'Second', 'Third','FirstSecond'];
    const [isLoading, setIsLoading] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const fetchData = (query) => {
        setIsLoading(true);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    const result = data?.filter((suggestion) => suggestion?.toLowerCase()?.includes(query?.toLowerCase()))
                    resolve(result);
                } catch {
                    reject('error while fetching data');
                }
                setIsLoading(false);
            }, 1000);
        })
    }
    const handleChange = (data) => {
        if(data?.query && data?.type == 'typing') {
            fetchData(data?.query).then(res => {
                setSuggestions(res)
            }).catch(error => {
                console.log('error coming', error)
            })
        } else {
            setSuggestions([]);
        }
    }

    return (
        <div>
            <AutoComplete suggestions={suggestions} onChange={handleChange} isLoading={isLoading}
            debounceSupport={true}
            />
        </div>
    )
}

export default AutoCompeteWrapper