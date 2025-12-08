import React, { useState } from 'react'
import './style.css'
import ReplyComment from './ReplyComment';


const CommentInfo = ({comments, comment, handleComment, handleDeleteComment, handleEditComment, handleExpandComment}) => {
    const [replyCommentOpen, setReplyCommentOpen] = useState(false);
    const [editCommentOpen, setEditCommentOpen] = useState(false);
    const [editCommentValue, setEditCommentValue] = useState(comment?.label);
    
    const handleReplyComment = () => {
        setReplyCommentOpen(!replyCommentOpen);
    }

    const handleEdit = () => {
        setEditCommentOpen(!editCommentOpen);
    }

    const handleEditChange = (e) => {
        setEditCommentValue(e.target.value);
    }
    return <>
          <div className="comment-headers">
                    {
                      !comment?.isExpanded &&
                    <button className='expand-btn' onClick={() => handleExpandComment(comment?.id, true)}>
                      +
                    </button>
                    }
                    {
                      comment?.isExpanded &&
                    <button className='non-expand-btn' onClick={() => handleExpandComment(comment?.id, false)}>
                      -
                    </button>
                    }
                <div>
                    { !editCommentOpen && comment?.label }
                    {
                        editCommentOpen && <div>
                            <input type="text" value={editCommentValue} onChange={handleEditChange} />
                        </div>
                    }
                </div>
                <div className="comment-actions">
                    {
                        !editCommentOpen && <button className='edit-btn' onClick={handleEdit}>Edit</button>
                    }
                    {
                        editCommentOpen && <button className='save-btn' onClick={() => { 
                            setEditCommentOpen(false);
                            handleEditComment(editCommentValue, comment?.id)}
                        }>Save</button>
                    }
                    {
                        editCommentOpen && <button className='cancel_btn' onClick={() => { 
                            setEditCommentValue(comment?.label)
                            setEditCommentOpen(false)} 
                        }>Cancel</button>
                    }
                    <button className='reply-btn' onClick={handleReplyComment}>
                        {
                            replyCommentOpen ? 'Cancel': 'Reply'
                        }
                    </button>
                    <button className='delete-btn' onClick={() => handleDeleteComment(comment?.id)}>Delete</button>
                </div>
            </div>
            <div>
                {
                 comments[comment?.id]?.children?.length == 0 && comment?.isExpanded && <>No Comments</>
                }
            </div>
            {
                replyCommentOpen && <ReplyComment id={comment?.id} setReplyCommentOpen={setReplyCommentOpen} handleComment={handleComment} />
            }
    </>
}

const List = ({comments, commentList, handleComment, handleDeleteComment, handleEditComment, handleExpandComment}) => {
    console.log(commentList)
    return (
        <div className='inner-comments'>
            <div className="line"></div>
            {
                commentList?.map((commentId) => {
                    const commentInfo = comments[commentId];
                    return <div className='nested-comments-list' key={commentId}>
                        <div className="comments-info">
                            <CommentInfo comments={comments} comment={commentInfo} handleComment={handleComment} handleDeleteComment={handleDeleteComment} handleEditComment={handleEditComment} handleExpandComment={handleExpandComment} />
                        </div>
                        {commentInfo?.isExpanded && !!commentInfo?.children?.length && <List comments={comments} handleComment={handleComment} handleDeleteComment={handleDeleteComment} handleEditComment={handleEditComment} handleExpandComment={handleExpandComment} commentList={commentInfo?.children} />}
                    </div>
            })
            }
        </div>
    )
}

const NestedComments = ({comments, handleComment, handleDeleteComment, handleEditComment, handleExpandComment}) => {
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
                                        <CommentInfo comments={comments} comment={commentInfo} handleComment={handleComment} handleDeleteComment={handleDeleteComment} handleEditComment={handleEditComment} handleExpandComment={handleExpandComment} />
                                    </div>
                            </div>
                            {commentInfo?.isExpanded && !!commentInfo?.children?.length && <List comments={comments} handleComment={handleComment} handleDeleteComment={handleDeleteComment} handleEditComment={handleEditComment} handleExpandComment={handleExpandComment} commentList={commentInfo?.children} />}
                        </div>
                    }
                })
            }
        </div>
    )
}

export default NestedComments