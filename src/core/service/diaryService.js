import {
  collection,
  addDoc,
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
    await addDoc(diariesDB, { uid, uidUser, emailUser, content, statusMood });
    toast.success("Create diary successsssssssss ^-^");
    const q = query(diariesDB, where("uid", "==", uid));
    const docSnap = await getDocs(q);
    if (docSnap.docs.length > 0) {
      return docSnap.docs[0].data();
    }
  } catch (error) {
    console.log(error);
    toast.error("Create diary errorrrrrrr :(((");
  }
};

const updateDiary = async (uid, dataUpdate) => {
  try {
    const diary = doc(db, "diaries", uid);
    const snap = await getDoc(diary);
    console.log(snap);
    console.log(snap.exists());
    await updateDoc(diary, dataUpdate);
    toast.success("Update diary successsssssssss ^-^");
    const q = query(diariesDB, where("uid", "==", uid));
    const docSnap = await getDocs(q);
    if (docSnap.docs.length > 0) {
      return docSnap.docs[0].data();
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
