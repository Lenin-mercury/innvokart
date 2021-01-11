import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';



const config = {
    apiKey: "AIzaSyCMNdbadq5jRE34Zcph6WiCJsyQtG1K2qE",
    authDomain: "invokart.firebaseapp.com",
    projectId: "invokart",
    storageBucket: "invokart.appspot.com",
    messagingSenderId: "485392948908",
    appId: "1:485392948908:web:bb8509d9dfe805e5aa4909"
  }


  firebase.initializeApp(config);
  
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;