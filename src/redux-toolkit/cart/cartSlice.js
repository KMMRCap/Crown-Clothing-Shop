import { createSlice } from "@reduxjs/toolkit";
import { cartItemsHandler, reduceItemQuantityHandler } from './utils'

export const cartSlice = createSlice({
    name: 'cartSlice',
    initialState: {
        hidden: true,
        cartItems: []
    },
    reducers: {
        hidden: (state, action) => {
            state.hidden = !state.hidden
        },
        addItemToCart: (state, action) => {
            state.cartItems = cartItemsHandler(state.cartItems, action.payload)
        },
        removeItemFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(item => item.id !== action.payload.id)
        },
        reduceItemQuantity: (state, action) => {
            state.cartItems = reduceItemQuantityHandler(state.cartItems, action.payload)
        },
        increaseItemQuantity: (state, action) => {
            state.cartItems = cartItemsHandler(state.cartItems, action.payload)
        }
    }
})

export const {
    hidden, addItemToCart, removeItemFromCart, reduceItemQuantity, increaseItemQuantity
} = cartSlice.actions

export default cartSlice.reducer