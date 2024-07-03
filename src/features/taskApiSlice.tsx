import { apiSlice } from "./apiSlice";
import { CommentType } from "./commentApiSlice";

export type TaskType = {
    id:number,
    title:string,
    description:string,
    createdAt:string,
    updatedAt:string,
    TaskContainerId:number,
    taskContainerId:number,
    Comments:CommentType[]
}

export const taskApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getTasks: builder.query({
            query: (taskContainerId) => `/task/${taskContainerId}`,
            providesTags: ['taskContainer','task']
        }),
        getTask: builder.query({
            query: (id) => `/task/single/${id}`,
            providesTags: ['task']
        }),
        createTask: builder.mutation({
            query: (data) => {
                return {
                    url: `/task/${data.taskContainerId}`,
                    method: 'POST',
                    body: {
                        title: data.title,
                        description:data.description
                    },
                    formData: true,
                };
            },
            invalidatesTags: ['taskContainer', 'task']
        }),
        updateTask: builder.mutation({
            query: data => {
                return {
                    url: `/task/${data.id}`,
                    method: 'PATCH',
                    body: {
                        taskContainerId:data.taskContainerId,
                        title: data.title,
                        description:data.description
                    },
                    formData: true,
                };
            },
            invalidatesTags: ['taskContainer', 'task']
        }),
        deleteTask: builder.mutation({
            query: id => ({
                url: `/task/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['taskContainer', 'task']
        }),
    })
})


export const {
    useGetTasksQuery,
    useGetTaskQuery,
    useCreateTaskMutation,
    useUpdateTaskMutation,
    useDeleteTaskMutation
} = taskApiSlice;