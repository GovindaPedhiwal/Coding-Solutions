import React, { useState } from 'react'
import NestedComments from './NestedComments'
import { data } from './data/data'

const NestedCommentsWrapper = () => {
    const [nestedComments, setNestedComments] = useState(data);

    const traverse = (targetId, value, comment) => {
        if(comment?.id == targetId) {
            const children = comment?.children || [];
            children.push({
                id: Date.now(),
                value: value,
                children: []
            })
            comment.children = children;
            return;
        }
        if(comment?.children) {
            comment.children.forEach((currComment) => {
                traverse(targetId, value, currComment)
            })
        }
    }

    const handleComment = (targetId, value) => {
        console.log(targetId,value)
        console.log(nestedComments)
        const cloneNestedComments = structuredClone(nestedComments);

        cloneNestedComments?.forEach((comment) => {
            traverse(targetId, value, comment);
        })

        setNestedComments(cloneNestedComments);
    }

    const traverseDelete = (targetId, comment) => {
        if(comment?.children) {
            comment.children = comment.children.filter((current) => {
                traverseDelete(targetId, current)
                if(current.id == targetId) return false;
                return true;
            })
        }
    }

    const handleDeleteComment = (targetId) => {
        console.log(targetId)
        let cloneNestedComments = structuredClone(nestedComments);

        cloneNestedComments = cloneNestedComments?.filter((comment) => {
            traverseDelete(targetId, comment);
            if(comment?.id == targetId) return false;
            return true;
        })
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