import { createApi, fetchBaseQuery} from "@reduxjs/tookit/query"

export const sandboxSMSApi = createApi({
    reducerPath: 'sandboxSMSApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '',

    }),
    endpoints: (builder) => ({
        sendDummySMS: builder.query({
            query: (params) => 'test'
        })
    })
})