import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { firestore, convertCollectionsSnapShotToMap } from '../../firebase'

export const getShopCollections = createAsyncThunk(
    'shopCollectionsFetch',
    async () => {
        try {
            const collectionRef = firestore.collection('collections')
            const snapshot = await collectionRef.get()
            const collectionMap = convertCollectionsSnapShotToMap(snapshot)
            return collectionMap
        }
        catch (err) {
            throw err
        }
    }
)

export const shopSlice = createSlice({
    name: 'shop',
    initialState: {
        fetching: false,
        collections: [],
        error: null
    },
    extraReducers: {
        [getShopCollections.pending]: (state, action) => {
            state.fetching = true
            state.collections = []
            state.error = null
        },
        [getShopCollections.fulfilled]: (state, action) => {
            state.fetching = false
            state.collections = action.payload
            state.error = null
        },
        [getShopCollections.rejected]: (state, action) => {
            state.fetching = false
            state.collections = null
            state.error = action.error
        }
    }
})

export default shopSlice.reducer