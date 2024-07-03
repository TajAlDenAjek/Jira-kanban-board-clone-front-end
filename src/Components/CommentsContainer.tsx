import React from 'react'
import { useGetCommentsQuery } from '../features/commentApiSlice'
import { CommentType } from '../features/commentApiSlice'
import Comment from './Comment'
import './board.css'


interface ICommentsContainerProps {
    taskId: number
}


const CommentsContainer: React.FC<ICommentsContainerProps> = ({ taskId }) => {
    const {
        data: comments,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetCommentsQuery(taskId)

    let content
    if (isLoading) {
        content = <h1>Loading...</h1>
    } else if (isSuccess) {
        content = comments.map((comment: CommentType, index: number) => (
            <Comment key={index} comment={comment} />
        ))
    } else if (isError) {
        content = <div>{error.toString()}</div>
    }

    return (
        <div className='comments-container'>{content}</div>
    )
}

export default CommentsContainer