import { db } from '../lib/firebase';
import { 
  collection, 
  getDocs, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  onSnapshot,
  query,
  where
} from 'firebase/firestore';

export const getTimetableData = async (section) => {
  try {
    const docRef = doc(db, 'timetables', section);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
  } catch (error) {
    console.error('Error fetching timetable:', error);
    throw error;
  }
};

export const subscribeToTimetable = (section, callback) => {
  const docRef = doc(db, 'timetables', section);
  return onSnapshot(docRef, (doc) => {
    callback(doc.exists() ? doc.data() : null);
  });
};

export const getFacultySchedule = async (facultyId) => {
  try {
    const q = query(
      collection(db, 'schedules'),
      where('facultyId', '==', facultyId)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching faculty schedule:', error);
    throw error;
  }
};

export const updateTimetable = async (section, data) => {
  try {
    const docRef = doc(db, 'timetables', section);
    await setDoc(docRef, data, { merge: true });
  } catch (error) {
    console.error('Error updating timetable:', error);
    throw error;
  }
};

export const getRoomSchedule = async (roomId) => {
  try {
    const docRef = doc(db, 'rooms', roomId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
  } catch (error) {
    console.error('Error fetching room schedule:', error);
    throw error;
  }
};