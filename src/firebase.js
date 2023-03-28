import { initializeApp } from 'firebase/app';
import {
 GoogleAuthProvider,
 GithubAuthProvider,
 getAuth,
 signInWithPopup,
 signInWithEmailAndPassword,
 createUserWithEmailAndPassword,
 sendPasswordResetEmail,
 signOut,
 updateProfile,
} from 'firebase/auth';

import {
 getFirestore
} from "firebase/firestore";
import { getStorage } from 'firebase/storage';
import toast from 'react-hot-toast';

const firebaseConfig = {
 apiKey: "AIzaSyC8RBoovSFShQDsaRFm8mh2lLZkeEdtrVA",
 authDomain: "fw12tt.firebaseapp.com",
 projectId: "fw12tt",
 storageBucket: "fw12tt.appspot.com",
 messagingSenderId: "828554853316",
 appId: "1:828554853316:web:277063a3d5f7fd9e710291",
 measurementId: "G-H328V6QW2T"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

const googleProvider = new GoogleAuthProvider();
const gitHubProvider = new GithubAuthProvider();

const signInWithGoogle = async () => {
 try {
   await signInWithPopup(auth, googleProvider);
   toast.success('Login successsssssssss ^-^');
 } catch (err) {
   console.log(err);
   toast.error('Login errorrrrrrr :(((');
 }
};

const signInWithGithub = async () => {
  try {
    await signInWithPopup(auth, gitHubProvider);
    toast.success('Login successsssssssss ^-^');
  }catch (err){
    console.log(err);
    toast.error('Login errorrrrrrr :(((');
  }
}

const logInWithEmailAndPassword = async (email, password) => {
 try {
   await signInWithEmailAndPassword(auth, email, password);
   toast.success('Login successsssssssss ^-^');
 } catch (err) {
   toast.error('Login errorrrrrrr :(((. Email or Password is invaliddddd');
 }
};

const registerWithEmailAndPassword = async (name, email, password) => {
 try {
  await createUserWithEmailAndPassword(auth, email, password);
   toast.success('Login successsssssssss ^-^');
 } catch (err) {
   console.error(err);
   toast.error('Login errorrrrrrr :(((');
 }
};

const sendPasswordReset = async (email) => {
 try {
   await sendPasswordResetEmail(auth, email);
   toast.success('Password reset link sent successsssssssss ^-^');
 } catch (err) {
   console.error(err);
   toast.error('Password reset link sent errorrrrrrr :(((');
 }
};

const logout = () => {
 signOut(auth);
};

export {
 auth,
 db,
 signInWithGoogle,
 signInWithGithub,
 logInWithEmailAndPassword,
 registerWithEmailAndPassword,
 sendPasswordReset,
 logout,
 storage
};

