import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
const firebaseConfig = {
  apiKey: 'AIzaSyDALL2Lp-JGGNuiTFYY02Uhw7z1j4ADZmc',
  authDomain: 'crwn-f605f.firebaseapp.com',
  projectId: 'crwn-f605f',
  storageBucket: 'crwn-f605f.appspot.com',
  messagingSenderId: '630062953188',
  appId: '1:630062953188:web:ceb8e59afbc19b5517f2f1',
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: 'select_account',
});

// instantiate objects section
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  console.log(userAuth);
};

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
// singelton instance that directly point to the DATABASE that tells firestore when to get or set a document IE data
export const database = getFirestore();

// In order to use the database this "method" or async function receives data from the authentication service. like Google. And then stores that inside of FIRESTORE.
export const createUserdocumentFromAuth = async (userAuth) => {
  //
  // userDocRef checks if there is an existing document reference and takes in three arguments:
  // database:stores the database instance
  // collections: users
  // identifier: a unique ID or UID that contains groupings of data
  const userDocRef = doc(database, 'users', userAuth.uid);
  // logs the userDocRef instance
  console.log(userDocRef);

  // checks the data related to the document
  const userSnapshot = await getDoc(userDocRef);
  // referenses userSnapshot
  console.log(userSnapshot);
  // userSnapshot allows for leveraging the .exists method which checks if that document exists in the firebase Database as collections.
  // that verification is for checking if there is a ducument storing the data already. If so we can ask for it If not we can create a document for that data.
  console.log(userSnapshot.exists());
};
