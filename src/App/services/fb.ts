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
import { Float16BufferAttribute } from 'three';

import * as ob from '../components/observer';

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
 * global variable for user information
 */

export let login = new ob.observable(false);
export let arr2 = new ob.observable([] as string[]);
export const user_information = new ob.observable({});

/**
 * Sign in with Google
 */

const provider = new GoogleAuthProvider() as GoogleAuthProvider;

export function loginWithPopup () {

    signInWithPopup(auth, provider )
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result)  as OAuthCredential;
            const token = credential.idToken as string;

            // The signed-in user info.
            // const user: User = result.user;

            create_cookies(token);
            login.set(true);
            set_user_information()

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

// export function loginWithRedirect () {
//     signInWithRedirect(auth, provider);

//     getRedirectResult(auth)
//         .then((result) => {
//             // This gives you a Google Access Token. You can use it to access Google APIs.
//             const credential = GoogleAuthProvider.credentialFromResult(result as UserCredential) as OAuthCredential ;
//             const token = credential.accessToken as string;
//             localStorage.setItem('token', token);

//             // The signed-in user info.
//             const user = result?.user as User;
//             console.log(user);
//         }).catch((error) => {
//             // Handle Errors here.
//             const errorCode = error.code;
//             const errorMessage = error.message;
//             // The email of the user's account used.
//             const email = error.customData.email;
//             // The AuthCredential type that was used.
//             const credential = GoogleAuthProvider.credentialFromError(error);
//             console.error(errorCode, errorMessage, email, credential);
//         });
// }

export function parse_token (token: string): Object | null {
    if(token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replaceAll('-', '+').replaceAll('_', '/');
        return JSON.parse(atob(base64));
    }else 
        console.error('No token found')
        return null;
}

function create_cookies (token : string) {
    const options = {
        // expires after 2 heures
        expires: new Date(Date.now() + 2 * 60 * 60 * 1000),
        // only accessible by the web server
        httpOnly: true,
        // use only HTTPS
        secure: true,
        path: "/myCookie"
    };

    const cookie: string = `${encodeURIComponent("token")}=${encodeURIComponent(token)};`;

    document.cookie = `${cookie}expires=${options.expires.toUTCString()};`;
    document.cookie = `${cookie}httpOnly;`;
    document.cookie = `${cookie}secure;`;
    document.cookie = `${cookie}path=${options.path};`;
}

function remove_cookies () {
    document.cookie =
        encodeURIComponent("token") + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
}

export function set_user_information () {
    user_information.set({})
    
    return user_information.set(parse_token(document.cookie) ?? {})
}

export function logout () {
    auth.signOut().then(() => {
        // Sign-out successful.
        login.set(false);
        remove_cookies();
        set_user_information();
    }).catch((error) => {
        // An error happened.
        console.error(error)
    });
}


export function save_cloud(file: object) {
    if(!login.get()) return console.error('You need to be logged in to save a file')
    console.log('saving file')
}

function if_login () {
    if(!login.get()){
        const ui = user_information
        if(Object.keys(ui).length === 0) return false
        else return true
    } else {
        return true
    }
}

login.set(if_login())

auth.onAuthStateChanged((user) => {
    console.log('onAuthStateChanged')
    console.log(user)
    console.log('onAuthStateChanged')
    if (user) {
        user_information.set(parse_token(user.accessToken))
        login.set(true)
    } else {
        login.set(false)
    }
});