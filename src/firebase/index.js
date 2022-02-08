import firebase from 'firebase/app'
import 'firebase/firebase-firestore'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyDzRAnd6qJGxoGxuU5DWU16pAVs__hnW4c",
    authDomain: "clothing-shop-955a8.firebaseapp.com",
    projectId: "clothing-shop-955a8",
    storageBucket: "clothing-shop-955a8.appspot.com",
    messagingSenderId: "937241201684",
    appId: "1:937241201684:web:66f8f29049631f6988eb01"
}

firebase.initializeApp(config)

export { firebase }
export const auth = firebase.auth()
export const firestore = firebase.firestore()

export const googleProvider = new firebase.auth.GoogleAuthProvider()
googleProvider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider)

export const createUserProfileDocument = async (userAuth, additionalData) => {
    try {
        if (!userAuth) return
        const userRef = firestore.doc(`users/${userAuth.uid}`)
        const snapshot = await userRef.get()
        if (!snapshot.exists) {
            const { displayName, email } = userAuth
            // const createdAt = new Date()
            try {
                await userRef.set({
                    displayName,
                    email,
                    // createdAt,
                    ...additionalData
                })
            }
            catch (error) {
                console.log('error creating user', error.message)
            }
        }
        return userRef
    }
    catch (err) {
        console.log(err);
    }
}

export const convertCollectionsSnapShotToMap = (collections) => {
    const transformedCollection = collections.docs.map(doc => {
        const { title, items } = doc.data()

        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items
        }
    })
    return transformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection
        return accumulator
    }, {})
}

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscibe = auth.onAuthStateChanged(userAuth => {
            unsubscibe()
            resolve(userAuth)
        }, reject)
    })
}