import React from 'react'
import Accordion from './Accordion'

const AccordionWrapper = () => {
    const accordions = [
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
    return (
        <div>
            <Accordion accordions={accordions}/>
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

export default AccordionWrapper