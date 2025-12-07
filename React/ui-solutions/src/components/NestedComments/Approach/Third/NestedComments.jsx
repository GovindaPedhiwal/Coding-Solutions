import React, { useState } from 'react'
import './style.css'
import ReplyComment from './ReplyComment';


const CommentInfo = ({comment, handleComment, handleDeleteComment}) => {
    const [replyCommentOpen, setReplyCommentOpen] = useState(false);
    
    const handleReplyComment = () => {
        setReplyCommentOpen(!replyCommentOpen);
    }
    return <>
          <div className="comment-headers">
                <div>
                    { comment?.label }
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
                replyCommentOpen && <ReplyComment id={comment?.id} setReplyCommentOpen={setReplyCommentOpen} handleComment={handleComment} />
            }
    </>
}

const List = ({comments, commentList, handleComment, handleDeleteComment}) => {
    console.log(commentList)
    return (
        <div className='inner-comments'>
            <div className="line"></div>
            {
                commentList?.map((commentId) => {
                    const commentInfo = comments[commentId];
                    return <div className='nested-comments-list' key={commentId}>
                        <div className="comments-info">
                            <CommentInfo comment={commentInfo} handleComment={handleComment} handleDeleteComment={handleDeleteComment} />
                        </div>
                        {!!commentInfo?.children?.length && <List comments={comments} handleComment={handleComment} handleDeleteComment={handleDeleteComment} commentList={commentInfo?.children} />}
                    </div>
            })
            }
        </div>
    )
}

const NestedComments = ({comments, handleComment, handleDeleteComment}) => {
    console.log(comments)
    return (
        <div className='nested-comments'>
            <div className="line"></div>
            {
                Object.keys(comments)?.map((commentId) => {
                    const commentInfo = comments[commentId];
                    if(commentInfo?.parentId == null) {
                        return <div className='nested-comments-list' key={commentId}>
                            <div className="comment-headers">
                                   <div className="comments-info">
                                        <CommentInfo comment={commentInfo} handleComment={handleComment} handleDeleteComment={handleDeleteComment} />
                                    </div>
                            </div>
                            {!!commentInfo?.children?.length && <List comments={comments} handleComment={handleComment} handleDeleteComment={handleDeleteComment} commentList={commentInfo?.children} />}
                        </div>
                    }
                })
            }
        </div>
    )
}

export default NestedComments