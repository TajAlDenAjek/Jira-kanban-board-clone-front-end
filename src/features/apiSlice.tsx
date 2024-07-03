import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
let SERVER_SIDE = 'http://localhost:3500/api'


const baseQuery = fetchBaseQuery({
    baseUrl: SERVER_SIDE,
})

// Api Slice
export const apiSlice = createApi({
    baseQuery: baseQuery,
    tagTypes: ['taskContainer','task','comment'],
    endpoints: () => ({}),
})