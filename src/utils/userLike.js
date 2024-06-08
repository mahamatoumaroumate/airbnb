import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  query,
  where,
} from 'firebase/firestore'
import { app } from '../firebase'
import { getStorage } from 'firebase/storage'
const db = getFirestore(app)
export const setUserLike = async ({ docId, userId }) => {
  const storage = getStorage(app)
  const data = await addDoc(collection(db, 'users'), {
    item: docId,
    userId,
  })
}
export const getUserFromDataBase = async ({ docId, userId }) => {
  const q = query(
    collection(db, 'users'),
    where('userId', '==', userId),
    where('item', '==', docId)
  )
  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map((doc) => {
    return { userDocId: doc.id, ...doc.data() }
  })
}

export const deleteUserFromDatabase = async ({ docId }) => {
  await deleteDoc(doc(db, 'users', docId))
}
