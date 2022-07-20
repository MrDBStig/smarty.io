import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

// Getting config values
const apiKey = process.env.REACT_APP_API_KEY;
const authDomain = process.env.REACT_APP_AUTH_DOMAIN;
const projectId = process.env.REACT_APP_PROJECT_ID;
const storageBucket = process.env.REACT_APP_STORAGE_BUCKET;
const messagingSenderId = process.env.REACT_APP_MESSAGING_SENDER_ID;
const appId = process.env.REACT_APP_APP_ID;
const measurementId = process.env.REACT_APP_MEASUREMENT_ID;

// Setting up config
const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  measurementId,
};

// Initialize Firebase and auth
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const db = getFirestore(app);

googleProvider.setCustomParameters({
  prompt: "select_account",
});

// Sign in/up/out functions
export const createNewUserWithEmail = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInUserWithEmail = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

export const signOutUser = async () => await signOut(auth);

//
export const createUserDocumentFromAuth = async (userAuth) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  // if there's no user in DB
  if (!userSnapshot.exists()) {
    const { email } = userAuth;
    try {
      await setDoc(userDocRef, { email });
    } catch (e) {
      console.error(`Error creating the user ${e}`);
    }
  }

  return userSnapshot;
};

// Operations with user tasks
export const getUserTasks = async () => {
  const userAuth = auth.currentUser;
  if (!userAuth) return;

  const tasksDocRef = doc(db, "users", userAuth.uid);
  const tasksSnapshot = await getDocs(collection(tasksDocRef, "tasks"));

  return Array.from(tasksSnapshot.docs, (doc) => {
    const { id } = doc;
    const {
      task: { name, done },
    } = doc.data();
    return { id, name, done };
  });
};

export const addUserTask = async (task) => {
  const userAuth = auth.currentUser;
  if (!userAuth) return;

  const tasksDocRef = doc(db, "users", userAuth.uid);
  await addDoc(collection(tasksDocRef, "tasks"), { task });

  return await getUserTasks();
};

export const updateUserTask = async (task) => {
  const userAuth = auth.currentUser;
  if (!userAuth) return;

  const tasksDocRef = doc(db, `users/${userAuth.uid}/tasks/${task.id}`);
  await updateDoc(tasksDocRef, { task });

  return await getUserTasks();
};

export const deleteUserTask = async (task) => {
  const userAuth = auth.currentUser;
  if (!userAuth) return;

  const tasksDocRef = doc(db, `users/${userAuth.uid}/tasks/${task.id}`);
  await deleteDoc(tasksDocRef, { task });

  return await getUserTasks();
};

// Set up user auth observer
export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
