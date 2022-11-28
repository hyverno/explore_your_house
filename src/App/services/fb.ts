import {FirebaseApp, initializeApp} from 'firebase/app';


import {getAuth,
    signInWithPopup,
    GoogleAuthProvider, 
    OAuthCredential, 
    signInWithRedirect,
    getRedirectResult,
    UserCredential,
    User,
    Auth,
} from 'firebase/auth';

const VITE_FIREBASE_API_KEY: any                = import.meta.env.VITE_FIREBASE_API_KEY;
const VITE_FIREBASE_AUTH_DOMAIN: any            = import.meta.env.VITE_FIREBASE_AUTH_DOMAIN;
const VITE_FIREBASE_PROJECT_ID: any             = import.meta.env.VITE_FIREBASE_PROJECT_ID;
const VITE_FIREBASE_STORAGE_BUCKET: any         = import.meta.env.VITE_FIREBASE_STORAGE_BUCKET;
const VITE_FIREBASE_MESSAGING_SENDER_ID: any    = import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID;
const VITE_FIREBASE_APP_ID: any                 = import.meta.env.VITE_FIREBASE_APP_ID;

export const app: FirebaseApp = initializeApp({
    apiKey:             VITE_FIREBASE_API_KEY,
    authDomain:         VITE_FIREBASE_AUTH_DOMAIN,
    projectId:          VITE_FIREBASE_PROJECT_ID,
    storageBucket:      VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId:  VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId:              VITE_FIREBASE_APP_ID,
});




export const auth = getAuth(app) as Auth;


/**
 * Sign in with Google
 */

const provider = new GoogleAuthProvider() as GoogleAuthProvider;

export function loginWithPopup () {

    signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result)  as OAuthCredential;
            const token = credential.accessToken as string;
            localStorage.setItem('token', token);

            // The signed-in user info.
            const user: User = result.user;
            console.log(user)

        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;

            // The email of the user's account used.
            const email = error.email;

            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            console.error(errorCode, errorMessage, email, credential)

        });
}

export function loginWithRedirect() {
    signInWithRedirect(auth, provider);

    getRedirectResult(auth)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access Google APIs.
            const credential = GoogleAuthProvider.credentialFromResult(result as UserCredential) as OAuthCredential ;
            const token = credential.accessToken as string;
            localStorage.setItem('token', token);

            // The signed-in user info.
            const user = result?.user as User;
            console.log(user);
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            console.error(errorCode, errorMessage, email, credential);
        });
}
