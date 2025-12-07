import React, { useState } from 'react'
import './style.css'
import ReplyComment from './ReplyComment'

const CommentInfo = ({comment, handleComment, handleDeleteComment, path}) => {
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
            <button className='delete-btn' onClick={() => handleDeleteComment(path)}>Delete</button>
        </div>
            </div>
        {
            replyCommentOpen && <ReplyComment setReplyCommentOpen={setReplyCommentOpen} path={path} handleComment={handleComment} />
        }
    </>
}


const NestedComments = ({nestedComments, handleComment, handleDeleteComment, path = ''}) => {
    return (
        <div className="nested-comments">
            <div className='line'></div>
            {
                nestedComments?.map((comment, idx) => {
                    return <div className="comments" key={idx}>
                        <div className="comments-info">
                        
                            <CommentInfo comment={comment} handleComment={handleComment} handleDeleteComment={handleDeleteComment} path={`${path}/${idx}`} />
                        </div>
                        {
                            comment?.children && <NestedComments nestedComments={comment?.children} handleComment={handleComment} handleDeleteComment={handleDeleteComment} path={`${path}/${idx}`} />
                        }
                    </div>
                })
            }
        </div>
    )
}

export default NestedComments