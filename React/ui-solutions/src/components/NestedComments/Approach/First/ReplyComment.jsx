import React, { useState } from 'react'

const ReplyComment = ({id, handleComment, setReplyCommentOpen}) => {
    const [commentValue, setCommentValue] = useState('');
    const handleCommentValue = (e) => {
        setCommentValue(e.target.value);
    }
    const handleReplyComment = () => {
        setReplyCommentOpen(false);
        handleComment(id, commentValue);
    }

    return (
        <div className='reply-comment'>
            <div className="reply-comment-box">
                <textarea placeholder='please give your reply...' onChange={handleCommentValue}></textarea>
            </div>
            <div className="reply-comment-btn">
                <button onClick={handleReplyComment}>Reply</button>
            </div>
        </div>
    )
}

export default ReplyComment