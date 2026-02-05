import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({ baseUrl: '' }) // empty base URL for now; is bacuse we use proxy at the vite, if not we can put here the backend URL eg 'http//localhost 5000'

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['User'], //this is the user in our model at the backend if we have like products,blogs etc here the only thing we have is user
    endpoints: (builder) => ({
        
    })
})