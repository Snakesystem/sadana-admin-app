import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, doc, getDoc, getDocs, getFirestore, orderBy, query } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDvcDErOf-vwYousNX7dPHhUyVbk6QkzIg",
  authDomain: "sadana-bill-app.firebaseapp.com",
  projectId: "sadana-bill-app",
  storageBucket: "sadana-bill-app.firebasestorage.app",
  messagingSenderId: "1024527979982",
  appId: "1:1024527979982:web:3ecb4c75ff018b4b0dc79f",
  measurementId: "G-MBSMLC020N"
};

const app = initializeApp(firebaseConfig);

export const session = getAuth()
export const db = getFirestore(app)
export const storage = getStorage(app)

export async function retrieveData(collectionName: string, order: string = "createdAt", operator: "asc" | "desc" = "desc") {
  const p = query(collection(db, collectionName), orderBy(order, operator));
  const snapshot = await getDocs(p);

  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return data;
}

export async function retrieveDataById(collectionName: string, id: string) {
  const snapshot = await getDoc(doc(db, collectionName, id));

  const data = snapshot.data();

  return data;
}
