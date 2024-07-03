import React from 'react'
import './board.css'

interface ICommentUserPicture {
    imageUrl: string
}


const CommentUserPicture: React.FC<ICommentUserPicture> = ({ imageUrl }) => {
    return (
        <div className='comment-single-pic'>
            <img src={imageUrl} style={{ borderRadius: "50%", width: '32px' }} />
        </div>
    )
}

export default CommentUserPicture