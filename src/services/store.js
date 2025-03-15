import { configureStore } from '@reduxjs/toolkit'

import {sandboxSMSApi} from './sms.js'

export const store = configureStore({
    reducer: {
        [sandboxSMSApi.reducerPath] : sandboxSMSApi.reducer
    },
    middleware:  (getDefaultMiddleware) => getDefaultMiddleware().concat(sandboxSMSApi.middleware)
})