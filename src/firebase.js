import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'


// Your web app's Firebase configuration
let firebaseConfig = {
    apiKey: "AIzaSyDCA-BvfN3gt64zqQehDgvdwdaN_ckWAgA",
    authDomain: "rick-f1fd4.firebaseapp.com",
    databaseURL: "https://rick-f1fd4.firebaseio.com",
    projectId: "rick-f1fd4",
    storageBucket: "rick-f1fd4.appspot.com",
    messagingSenderId: "683621763897",
    appId: "1:683621763897:web:79634a0c009286c91176e8"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//BD
let db = firebase.firestore().collection('favs')

export const getFavs = (uid) => {
    return db.doc(uid).get()
    .then(snap => {
        return snap.data().array
    })
}

export const updateDB = (array, uid) => {
    return db.doc(uid).set({array})
} 

export function signOutGoogle(){
    firebase.auth().signOut()
}

export function loginWithGoogle() {
    let provider = new firebase.auth.GoogleAuthProvider()
    return firebase.auth().signInWithPopup(provider)
        .then(snap => snap.user)
}

