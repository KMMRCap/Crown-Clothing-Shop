import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { firestore, convertCollectionsSnapShotToMap } from '../../firebase'

export const getShopCollections = createAsyncThunk(
    'shopCollectionsFetch',
    async () => {
        const collectionRef = firestore.collection('collections')
        const snapshot = await collectionRef.get()
        const collectionMap = convertCollectionsSnapShotToMap(snapshot)
        return collectionMap
    }
)

export const shopSlice = createSlice({
    name: 'shop',
    initialState: {
        fetching: false,
        collections: []
    },
    extraReducers: {
        [getShopCollections.pending]: (state, action) => {
            state.fetching = true
            state.collections = []
        },
        [getShopCollections.fulfilled]: (state, action) => {
            state.fetching = false
            state.collections = action.payload
        },
        [getShopCollections.rejected]: (state, action) => {
            state.fetching = false
            state.collections = null
        }
    }
})

export default shopSlice.reducer