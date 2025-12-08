import React, { useState } from 'react'
import NestedComments from './NestedComments'
import { data } from './data/data'

const NestedCommentsWrapper = () => {
    const [commentsData ,setCommentsData] = useState(data);

    const handleDeleteComment = (id) => {
        console.log(id)
        const parentId = commentsData[id]?.parentId;
        console.log(commentsData)
        let cloneCommentsData = structuredClone(commentsData);

        console.log(parentId)

        if(parentId) {
            cloneCommentsData[parentId].children = cloneCommentsData[parentId].children?.filter((childId) => childId !== id);
        }

        const queue = [id];
        while(queue.length > 0) {
            const nodeToDeleteIdx = queue.shift();
            queue.push(...cloneCommentsData[nodeToDeleteIdx].children);
            delete cloneCommentsData[nodeToDeleteIdx];
        }

        setCommentsData(cloneCommentsData);

    }

    const handleComment = (id, value) => {
        console.log(id, value)
        let newCommentId = Date.now();
        const newCommentInfo = {
            id: newCommentId,
            parentId: id,
            label: value,
            children: []
        }
        let cloneCommentsData = structuredClone(commentsData);
        cloneCommentsData[id].children.push(newCommentId);
        cloneCommentsData[newCommentId] = newCommentInfo;

        setCommentsData(cloneCommentsData);
    }

    const handleEditComment = (value, id) => {
        console.log(value)
        let cloneCommentsData = structuredClone(commentsData);
        cloneCommentsData[id].label = value;
        setCommentsData(cloneCommentsData);
    }

    const handleExpandComment = (id, isExpanded) => {
        let cloneCommentsData = structuredClone(commentsData);
        cloneCommentsData[id].isExpanded = isExpanded;
        setCommentsData(cloneCommentsData);
    }

    return (
        <div>
            <NestedComments comments={commentsData} handleComment={handleComment} handleDeleteComment={handleDeleteComment} handleEditComment={handleEditComment} handleExpandComment={handleExpandComment} />
        </div>
    )
}

export default NestedCommentsWrapper