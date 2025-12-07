import React, { useState } from 'react'
import NestedComments from './NestedComments'
import { data } from './data/data'

const NestedCommentsWrapper = () => {
    const [nestedComments, setNestedComments] = useState(data);

    const handleComment = (path, value) => {
        console.log(path,value)
        console.log(nestedComments)
        let cloneNestedComments = structuredClone(nestedComments);
        const pathArray = path?.split('/')?.filter((item) => item);
        const lastElementIdx = Number(pathArray.pop());

        console.log(pathArray)

        let temp = cloneNestedComments;
        for(let i = 0;i < pathArray.length; i++) {
            const idx = Number(pathArray[i]);
            temp = temp[idx]?.children;
        }
        temp[lastElementIdx].children.push({
            id: Date.now(),
            value: value,
            children: []
        })

        setNestedComments(cloneNestedComments);
    }

    const handleDeleteComment = (path) => {
        console.log(path)
        let cloneNestedComments = structuredClone(nestedComments);
        const pathArray = path?.split('/')?.filter((item) => item)
        console.log(pathArray)
        const lastElementIdx = Number(pathArray.pop());
        if(pathArray?.length == 0) {
            cloneNestedComments = cloneNestedComments?.filter((_, idx) => idx !== lastElementIdx)
        } else {
            let temp = cloneNestedComments;
            for(let i = 0;i < pathArray.length; i++) {
                const idx = Number(pathArray[i]);
                if(i !== pathArray.length - 1) {
                    temp = temp[idx]?.children;
                } else {
                    temp[idx].children = temp[idx].children.filter((comment, idx) => idx !== lastElementIdx);
                }
            }
        }
        
        setNestedComments(cloneNestedComments);
    }

    console.log(nestedComments)

    return (
        <div>
            <NestedComments nestedComments={nestedComments} handleComment={handleComment} handleDeleteComment={handleDeleteComment} />
        </div>
    )
}

export default NestedCommentsWrapper