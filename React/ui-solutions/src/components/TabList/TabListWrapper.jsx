import React from 'react'
import TabList from './TabList'

const TabListWrapper = () => {
    const tabList = [
        {
            id: 1,
            label: 'First',
            component: ComponentA
        },
        {
            id: 2,
            label: 'Second',
            component: ComponentB
        },
        {
            id: 3,
            label: 'Third',
            component: ComponentC
        }
    ]
    const getActiveTab = (idx) => {
        console.log(idx)
    }
    return (
        <div>
             <TabList tabs={tabList} onClick={getActiveTab} />   
        </div>
    )
}

const ComponentA = () => {
    return <div>
        Component A
    </div>
}
const ComponentB = () => {
    return <div>
        Component B
    </div>
}
const ComponentC = () => {
    return <div>
        Component C
    </div>
}





export default TabListWrapper