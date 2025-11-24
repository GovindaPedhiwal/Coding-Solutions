import React, { useState } from 'react'
import './style.css'

const TabList = ({tabs, defaultTabOpen = 0, onClick}) => {
    const [selectedTab, setSelectedTab] = useState(defaultTabOpen);
    const SelectedTabComponent = tabs[selectedTab]?.component;

    const handleClick = (idx) => {
        return () => {
            setSelectedTab(idx);
            onClick(idx);
        }
    }
    return (
        <div>
            <h1>
                TabList
            </h1>
            <div className='wrapper'>
                <div className="center">
                    <div className="tab-list">
                        {
                            tabs?.map((tab, idx) => {
                                return <div className={`tab ${selectedTab === idx ? 'active' : ''}`}  key={idx}>
                                    <button onClick={handleClick(idx)}>{tab?.label}</button>
                                </div>
                            })
                        }
                    </div>
                    <div className="tab-content">
                        <SelectedTabComponent />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TabList