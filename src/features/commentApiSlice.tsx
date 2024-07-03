import { apiSlice } from "./apiSlice";


export type CommentType = {
    id:number,
    text:string,
    createdAt:string,
    updatedAt:string,
    TaskId:number,
    taskId:number
}

export const commentApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getComments: builder.query({
            query: (taskId) => `/comment/${taskId}`,
            providesTags: ['comment']
        }),
        getComment: builder.query({
            query: (id) => `/comment/single/${id}`,
            providesTags: ['comment']
        }),
        createComment: builder.mutation({
            query: (data) => {
                return {
                    url: `/comment/${data.taskId}`,
                    method: 'POST',
                    body:{text:data.text},
                    formData: true,
                };
            },
            invalidatesTags: ['taskContainer', 'task','comment']
        }),
        updateComment: builder.mutation({
            query: data => {
                return {
                    url: `/comment/${data.id}`,
                    method: 'PATCH',
                    body:{text:data.text},
                    formData: true,
                };
            },
            invalidatesTags: ['taskContainer', 'task','comment']
        }),
        deleteComment: builder.mutation({
            query: id => ({
                url: `/comment/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['taskContainer', 'task','comment']
        }),
    })
})


export const {
    useGetCommentsQuery,
    useGetCommentQuery,
    useCreateCommentMutation,
    useUpdateCommentMutation,
    useDeleteCommentMutation
} = commentApiSlice;