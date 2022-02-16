import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { auth, createUserProfileDocument, getCurrentUser, googleProvider } from '../../firebase'


export const checkUserSession = createAsyncThunk(
    'checkUserSession',
    async () => {
        try {
            const user = await getCurrentUser()
            if (user) {
                const userRef = await createUserProfileDocument(user)
                const userSnapshot = await userRef.get()
                return {
                    id: userSnapshot.id,
                    ...userSnapshot.data()
                }
            }
        }
        catch (err) {
            throw err
        }
    }
)

export const signInWithEmail = createAsyncThunk(
    'signInWithEmail',
    async ({ email, password }) => {
        try {
            const { user } = await auth.signInWithEmailAndPassword(email, password)
            const userRef = await createUserProfileDocument(user)
            const userSnapshot = await userRef.get()
            return {
                id: userSnapshot.id,
                ...userSnapshot.data()
            }
        }
        catch (err) {
            throw err
        }
    }
)

export const signInWithGoogle = createAsyncThunk(
    'signInWithGoogle',
    async () => {
        try {
            const { user } = await auth.signInWithPopup(googleProvider)
            const userRef = await createUserProfileDocument(user)
            const userSnapshot = await userRef.get()
            return {
                id: userSnapshot.id,
                ...userSnapshot.data()
            }
        }
        catch (err) {
            throw err
        }
    }
)

export const signOut = createAsyncThunk(
    'signOut',
    async () => {
        try {
            await auth.signOut()
            return 'success'
        }
        catch (err) {
            throw err
        }
    }
)

export const signUp = createAsyncThunk(
    'signUp',
    async ({ email, password, displayName }) => {
        try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password)
            const userRef = await createUserProfileDocument(user, { displayName })
            const userSnapshot = await userRef.get()
            return {
                id: userSnapshot.id,
                ...userSnapshot.data()
            }
        }
        catch (err) {
            throw err
        }
    }
)


export const userSlice = createSlice({
    name: 'user',
    initialState: {
        fetching: false,
        currentUser: null,
        error: null
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
    extraReducers: {
        [checkUserSession.pending]: (state, action) => {
            state.fetching = true
            state.currentUser = null
            state.error = null
        },
        [checkUserSession.fulfilled]: (state, action) => {
            state.fetching = false
            state.currentUser = action.payload ? action.payload : null
            state.error = null
        },
        [checkUserSession.rejected]: (state, action) => {
            state.fetching = false
            state.currentUser = null
            state.error = action.error
        },

        // -----------------------------------

        [signInWithEmail.pending]: (state, action) => {
            state.fetching = true
            state.currentUser = null
            state.error = null
        },
        [signInWithEmail.fulfilled]: (state, action) => {
            state.fetching = false
            state.currentUser = action.payload
            state.error = null
        },
        [signInWithEmail.rejected]: (state, action) => {
            state.fetching = false
            state.currentUser = null
            state.error = action.error
        },

        // -----------------------------------

        [signInWithGoogle.pending]: (state, action) => {
            state.fetching = true
            state.currentUser = null
            state.error = null
        },
        [signInWithGoogle.fulfilled]: (state, action) => {
            state.fetching = false
            state.currentUser = action.payload
            state.error = null
        },
        [signInWithGoogle.rejected]: (state, action) => {
            state.fetching = false
            state.currentUser = null
            state.error = action.error
        },

        // -----------------------------------

        [signOut.pending]: (state, action) => {
            state.fetching = true
            state.currentUser = null
            state.error = null
        },
        [signOut.fulfilled]: (state, action) => {
            state.fetching = false
            state.currentUser = null
            state.error = null
        },
        [signOut.rejected]: (state, action) => {
            state.fetching = false
            state.currentUser = null
            state.error = action.error
        },

        // -----------------------------------

        [signUp.pending]: (state, action) => {
            state.fetching = true
            state.currentUser = null
            state.error = null
        },
        [signUp.fulfilled]: (state, action) => {
            state.fetching = false
            state.currentUser = action.payload
            state.error = null
        },
        [signUp.rejected]: (state, action) => {
            state.fetching = false
            state.currentUser = null
            state.error = action.error
        }
    }
})

export default userSlice.reducer