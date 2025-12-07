import React, { useState } from 'react'
import './style.css'
import ReplyComment from './ReplyComment'

const CommentInfo = ({comment, handleComment, handleDeleteComment}) => {
    const [replyCommentOpen, setReplyCommentOpen] = useState(false);
    
    const handleReplyComment = () => {
        setReplyCommentOpen(!replyCommentOpen);
    }
    return <>
          <div className="comment-header">
            <div>
                                {
                                    comment?.value
                                }
                            </div>
        <div className="comment-actions">
            <button className='reply-btn' onClick={handleReplyComment}>
                {
                    replyCommentOpen ? 'Cancel': 'Reply'
                }
            </button>
            <button className='delete-btn' onClick={() => handleDeleteComment(comment?.id)}>Delete</button>
        </div>
            </div>
        {
            replyCommentOpen && <ReplyComment setReplyCommentOpen={setReplyCommentOpen} id={comment?.id} handleComment={handleComment} />
        }
    </>
}


const NestedComments = ({nestedComments, handleComment, handleDeleteComment}) => {
    return (
        <div className="nested-comments">
            {
                nestedComments?.map((comment, idx) => {
                    return <div className="comments" key={idx}>
                        <div className="comments-info">
                        
                            <CommentInfo comment={comment} handleComment={handleComment} handleDeleteComment={handleDeleteComment} />
                        </div>
                        {
                            comment?.children && <NestedComments nestedComments={comment?.children} handleComment={handleComment} handleDeleteComment={handleDeleteComment} />
                        }
                    </div>
                })
            }
        </div>
    )
}

export default NestedComments