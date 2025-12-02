import React, { useRef } from 'react'
import PopOver, { PopOverAction, PopOverContent } from './PopOver'

const PopOverWrapper = () => {
    const triggerRef = useRef();
    const contentRef = useRef();
    const triggerRef1 = useRef();
    const contentRef1 = useRef();
    return (
        <div style={{marginLeft: 50}}>
            <h1>PopOver</h1>
            <PopOver triggerRef={triggerRef} contentRef={contentRef}>
                <PopOverAction>
                    <button ref={triggerRef}>Click it!</button>
                </PopOverAction>
                <PopOverContent>
                    <p>content</p>
                </PopOverContent>
            </PopOver>
           <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Placeat laudantium aspernatur unde, porro accusamus delectus iure. Quod repudiandae deserunt magnam aliquam vero, voluptatum recusandae corrupti commodi. Libero quos, possimus molestias quaerat error itaque eaque laborum quia maiores blanditiis animi voluptates culpa. Omnis, sequi voluptatum esse quibusdam, error quia ab eum possimus blanditiis qui fugit nesciunt laborum minima. Inventore, assumenda commodi optio veniam aliquid rem ipsam quo nostrum magnam quibusdam corrupti odio recusandae itaque debitis accusantium distinctio reprehenderit blanditiis voluptatibus enim in quod totam! Repudiandae repellendus aliquid distinctio illo placeat itaque, reiciendis veniam atque molestias illum fuga laudantium eaque numquam quis ea ipsa dignissimos. Eius eveniet officiis non vitae aperiam quibusdam accusantium. Porro quibusdam optio eos molestias veritatis nam earum iure dolor doloribus ex illum perferendis voluptatum quaerat architecto molestiae aspernatur totam qui beatae est ratione deleniti recusandae vitae, debitis officiis. Commodi dolore sed architecto dolorum recusandae aut ipsum natus molestias dolores, sapiente, quas alias totam! Veniam, amet ratione quibusdam a aspernatur iste odio et inventore quam mollitia dolorum voluptate eveniet exercitationem beatae itaque ex. Consequuntur ipsam, mollitia porro quaerat minus soluta. Officia quidem inventore rem eos eveniet ullam repudiandae saepe, perferendis aliquid quas, dolores alias officiis commodi odio, voluptatum deleniti.</p>
            <PopOver triggerRef={triggerRef1} contentRef={contentRef1}>
                <PopOverAction>
                    <button ref={triggerRef1}>Click it!</button>
                </PopOverAction>
                <PopOverContent>
                    <p>content</p>
                </PopOverContent>
            </PopOver>
        </div>
    )
}

export default PopOverWrapper