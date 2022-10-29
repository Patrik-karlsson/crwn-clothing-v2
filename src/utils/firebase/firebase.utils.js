import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
<<<<<<< HEAD
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDALL2Lp-JGGNuiTFYY02Uhw7z1j4ADZmc',
  authDomain: 'crwn-f605f.firebaseapp.com',
  projectId: 'crwn-f605f',
  storageBucket: 'crwn-f605f.appspot.com',
  messagingSenderId: '630062953188',
  appId: '1:630062953188:web:ceb8e59afbc19b5517f2f1',
=======
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from 'firebase/firestore';

// use your own config
// I used env but it's not necessary, just paste the config you get from firebase console
const firebaseConfig = {
  apiKey: 'AIzaSyArGk_qPGzVPDBZwj-eWJ4JMos0oxWHEzQ',
  authDomain: 'crwn-clothing-db-72a6b.firebaseapp.com',
  projectId: 'crwn-clothing-db-72a6b',
  storageBucket: 'crwn-clothing-db-72a6b.appspot.com',
  messagingSenderId: '949442988895',
  appId: '1:949442988895:web:c32255b249c1e96aac44ea',
>>>>>>> 2a81cd144a5d969cfa4416aaab09063020329e02
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
<<<<<<< HEAD

googleProvider.setCustomParameters({
  prompt: 'select_account',
=======
googleProvider.setCustomParameters({
  promp: 'select_account',
>>>>>>> 2a81cd144a5d969cfa4416aaab09063020329e02
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

<<<<<<< HEAD
=======
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const batch = writeBatch(db);
  const collectionRef = collection(db, collectionKey);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log('done');
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});

  return categoryMap;
};

>>>>>>> 2a81cd144a5d969cfa4416aaab09063020329e02
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};
<<<<<<< HEAD
export const signOutUser = async () => await signOut(auth);
=======

export const signOutUser = async () => await signOut(auth);

>>>>>>> 2a81cd144a5d969cfa4416aaab09063020329e02
export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
