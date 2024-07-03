import React, { useState } from 'react';
import { CommentType } from '../features/commentApiSlice';
import { FrownOutlined } from '@ant-design/icons';
import { useUpdateCommentMutation, useDeleteCommentMutation } from '../features/commentApiSlice';
import CommentUserPicture from './CommentUserPicture';


interface ICommentPropsProps {
    comment: CommentType
}
const Comment: React.FC<ICommentPropsProps> = ({ comment }) => {
    let current: Date = new Date();
    let commentDate: Date = new Date(comment.updatedAt);
    let timeDiff: number = current.getTime() - commentDate.getTime();
    let hours: number = timeDiff / (1000 * 60 * 60);
    let minutes: number = hours*60
    hours=Math.floor(hours)
    minutes=Math.floor(minutes)
    const [updateText, setUpdateText] = useState<string>(comment.text)
    const [updateMode, setUpdateMode] = useState<Boolean>(false)
    const [updateComment] = useUpdateCommentMutation();
    const [deleteComment] = useDeleteCommentMutation();

    const handleDeleteComment = async () => {
        await deleteComment(comment.id).unwrap()
    }
    const handleUpdateComment = async (event: any) => {
        if (updateText.trim() !== '') {
            if (event.key === 'Enter') {
                await updateComment({ id: comment.id, text: updateText }).unwrap()
                setUpdateMode(false)
            }
        }
    }
    return (
        <div className='comment-single'>
            <CommentUserPicture imageUrl="https://secure.gravatar.com/avatar/4139e1d0136c2421ad5a5bece95f2d7d?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Finitials%2FTA-4.png" alt="Profile image of Taj Al Den Ajek"/>
            <div className="comment-single-details">
                <div className="comment-single-details-child">
                    <div>Taj Al Den Ajek</div>
                    <div>{
                        hours ? `${hours} hour${hours === 1 ? '' : 's'} ago`
                            : `${minutes === 0 ? `Less than a minute ago` : `${minutes} minute${minutes === 1 ? '' : 's'}  ago`}`
                    }</div>
                </div>
                <div className="comment-single-details-child">
                    {
                        updateMode ?
                            <input className='update-comment-text' value={updateText} onKeyDown={handleUpdateComment} onChange={(e) => setUpdateText(e.target.value)} />
                            : comment.text
                    }
                </div>
                <div className="comment-single-details-child">
                    <div onClick={() => setUpdateMode(true)}>Edit</div>
                    <div onClick={handleDeleteComment}>Delete</div>
                    <div title='Add reaction'><FrownOutlined /></div>
                </div>
            </div>
        </div>
    )
}

export default Comment