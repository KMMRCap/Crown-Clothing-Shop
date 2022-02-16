import { configureStore } from '@reduxjs/toolkit'

import cartSlice from './cart/cartSlice'
import directorySlice from './Directory/directorySlice'
import shopSlice from './shop/shopSlice'
import userSlice from './user/userSlice'

export const store = configureStore({
    reducer: {
        directory: directorySlice,
        shop: shopSlice,
        user: userSlice,
        cart: cartSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})