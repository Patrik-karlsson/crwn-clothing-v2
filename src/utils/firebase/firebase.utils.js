import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
// getFirestore: allows developers to make CRUD actions
// doc:lets us retrieve documents from firestore database
// getDoc: lets us retrive data from the documents
// setDoc: lets us set data on documents
const firebaseConfig = {
  apiKey: 'AIzaSyDALL2Lp-JGGNuiTFYY02Uhw7z1j4ADZmc',
  authDomain: 'crwn-f605f.firebaseapp.com',
  projectId: 'crwn-f605f',
  storageBucket: 'crwn-f605f.appspot.com',
  messagingSenderId: '630062953188',
  appId: '1:630062953188:web:ceb8e59afbc19b5517f2f1',
};
// creates an app instance/object based on the config by identifying the relevant Software Developer Kit pr SDK
const firebaseApp = initializeApp(firebaseConfig);

// Google auth provider, which in turn will give you back this provider instance.

// These providers are kind of just instructions for this instance of provider, but you can have multiple different providers authentication.
const provider = new GoogleAuthProvider();

// custom parameters will take some kind of configuration object and with it we can tell different ways that we want this Google auth provider to behave.
provider.setCustomParameters({
  // prompt means is that every time somebody interacts with our provider, we want to always force them to select an account.
  prompt: 'select_account',
});

// instantiate (or create) objects section: by exporting the the instance
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  console.log(userAuth);
};
// even with several providers that all have their own authentication. The application in itself only ever needs one authentivation
export const auth = getAuth();

// exporting out sign in with popup
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

//this Singleton instance allows us now to tell Firebase when we want to get a document or we want to set a document or anything like that related to our database.
export const database = getFirestore();

// In order to use the database this "method" or async function receives data from the authentication service. like from the Google authProvider. And then stores that inside of FIRESTORE.
export const createUserdocumentFromAuth = async (userAuth) => {
  // userDocRef checks if there is an existing document reference and takes in three arguments:
  // database:stores the database instance
  // collections: (in this case called) users.
  // identifier: a unique ID or UID that contains groupings of data
  const userDocRef = doc(database, 'users', userAuth.uid);
  // logs the userDocRef instance
  console.log(userDocRef);

  // checks the data related to the document
  const userSnapshot = await getDoc(userDocRef);
  // referenses userSnapshot
  console.log(userSnapshot);
  // userSnapshot allows for leveraging the .exists method which checks if that document exists in the firebase Database as collections.
  // that verification is for checking if there is a document storing the data already in the database. If so we can ask for it If not we can create a document for that data.
  console.log(userSnapshot.exists());

  // How to create/ set the document with the data from user in the collection?
  // because the user snapshot is already pointing to a specific place in a collection for the data we want. ¨

  //  the bang operator, which means that if the snapshot. exists then it'll return true.If it doesn't exist, it gives us false.
  // So that means that if it doesn't exist, this will return true.
  if (!userSnapshot.exists()) {
    // if the document does not exist. To then create and set the document. One needs to extract the displayName and email from the user auth object (the fields on the object alongside the UID)
    // which can be retrived from the userAuth object
    const { displayName, email } = userAuth;
    // to get the snapshot to display the Date the users are signing in
    const createdAt = new Date();
    // Then in order to set this document, we need a try catch block.
    // so if setting the document does not work the catch is going to display the error.
    try {
      // if get doc gets us the document, then set doc allows us to set the document.
      // And similarly, what we're going to pass it is a user doc reference that we just got back using the doc and then we're going to pass it the data we want to set it with.
      //  we're going to pass it the data we want to set it with from the doc ("or userDocRef")
      // So here we want to set a display name, we want to set a email and we want to set a created at date.
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      // logging custom error message as well as the error.message
      console.log('error creting the user', error.message);
    }
  }
  // So we have now created a way to create users.
  //   using this system we now have authentication as well as storage of these users inside of our application.
  return userDocRef;
};
