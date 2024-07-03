import { apiSlice } from "./apiSlice";
import { TaskType } from "./taskApiSlice";


export type TaskContainerType = {
    id:number,
    name:string,
    createdAt:string,
    updatedAt:string,
    Tasks:TaskType[]
}

export const taskContainerApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getTaskContainers: builder.query({
            query: () => `/taskContainer`,
            providesTags: ['taskContainer']
        }),
        getTaskContainer: builder.query({
            query: (id) => `/taskContainer/${id}`,
            providesTags: ['taskContainer']
        }),
        createTaskContainer: builder.mutation({
            query: (data) => {
                return {
                    url: `/taskContainer`,
                    method: 'POST',
                    body: { name: data.name },
                    formData: true,
                };
            },
            invalidatesTags: ['taskContainer']
        }),
        updateTaskContainer: builder.mutation({
            query: data => {
                return {
                    url: `/taskContainer/${data.id}`,
                    method: 'PATCH',
                    body: { name: data.name },
                    formData: true,
                };
            },
            invalidatesTags: ['taskContainer']
        }),
        deleteTaskContainer: builder.mutation({
            query: id => ({
                url: `/taskContainer/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['taskContainer']
        }),
    })
})


export const {
    useGetTaskContainersQuery,
    useGetTaskContainerQuery,
    useCreateTaskContainerMutation,
    useUpdateTaskContainerMutation,
    useDeleteTaskContainerMutation
} = taskContainerApiSlice