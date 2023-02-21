import {
  collection,
  setDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase";
import toast from "react-hot-toast";

const diariesDB = collection(db, "diaries");

const createDiary = async (uid, uidUser, emailUser, content, statusMood) => {
  try {
    await setDoc(doc(db, 'diaries', uid), {uidUser, emailUser, content, statusMood})
    toast.success("Create diary successsssssssss ^-^");
    const docSnap = await getDoc(doc(db, 'diaries', uid));
    if (docSnap.exists()) {
      return docSnap;
    }
  } catch (error) {
    console.log(error);
    toast.error("Create diary errorrrrrrr :(((");
  }
};

const updateDiary = async (uid, dataUpdate) => {
  try {
    const snap = doc(db, "diaries", uid);
    await updateDoc(snap, dataUpdate);
    toast.success("Update diary successsssssssss ^-^");
    const docSnapUpdate =  await getDoc(snap);
    if (docSnapUpdate.exists()) {
      return docSnapUpdate;
    }
  } catch (error) {
    console.log(error);
    toast.error("Update diary errorrrrrrr :(((");
  }
};

const getDiaries = async (userEmail) => {
  try {
    const q = query(diariesDB, where("emailUser", "==", userEmail));
    const diaries = await getDocs(q);
    if (diaries.docs.length > 0) {
      return diaries.docs;
    }
    // return await getDoc(query);
  } catch (error) {
    console.log(error);
  }
};

export { createDiary, updateDiary,getDiaries };
