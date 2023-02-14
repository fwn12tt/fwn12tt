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
 getFirestore,
 query,
 getDocs,
 collection,
 where,
 addDoc,
} from "firebase/firestore";
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

const googleProvider = new GoogleAuthProvider();
const gitHubProvider = new GithubAuthProvider();

const signInWithGoogle = async () => {
 try {
   const res = await signInWithPopup(auth, googleProvider);
   const user = res.user;
   const q = query(collection(db, "users"), where("uid", "==", user.uid));
   const docs = await getDocs(q);
   if (docs.docs.length === 0) {
     await addDoc(collection(db, "users"), {
       uid: user.uid,
       name: user.displayName,
       authProvider: "google",
       email: user.email,
     });
   }
   toast.success('Login successsssssssss ^-^');
 } catch (err) {
   console.log(err);
   toast.error('Login errorrrrrrr :(((');
 }
};

const signInWithGithub = async () => {
  try {
    const res = await signInWithPopup(auth, gitHubProvider);
    const user = res.user;
    const q = query(collection(db, 'users'), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if(docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "github",
        email: user.email,
      })
    }
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
   const res = await createUserWithEmailAndPassword(auth, email, password);
   const user = res.user;
   await addDoc(collection(db, "users"), {
     uid: user.uid,
     name,
     authProvider: "email",
     email,
   });
   toast.success('Login successsssssssss ^-^');
 } catch (err) {
   console.error(err);
   toast.error('Login errorrrrrrr :(((');
 }
};

const sendPasswordReset = async (email) => {
 try {
   await sendPasswordResetEmail(auth, email);
   alert("Password reset link sent!");
 } catch (err) {
   console.error(err);
   alert(err.message);
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
};

