import {
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
  onSnapshot,
  query,
  where
} from 'firebase/firestore';
import { db as firestoreDb, isFirebaseConfigured } from '../lib/firebase';
import { timetableData } from '../data/timetableData';

const getLocalTimetable = (section) => {
  const normalizedSection = timetableData.sections[section];
  if (!normalizedSection) {
    return null;
  }

  return {
    section,
    roomNumber: normalizedSection.roomNumber,
    schedule: normalizedSection.schedule,
    faculty: normalizedSection.faculty || timetableData.faculty
  };
};

const getLocalFacultySchedule = (facultyId) => {
  const scheduleEntries = [];

  Object.entries(timetableData.sections).forEach(([section, sectionData]) => {
    Object.entries(sectionData.schedule).forEach(([day, slots]) => {
      Object.entries(slots).forEach(([time, subject]) => {
        if (subject && sectionData.faculty?.[subject]?.includes?.(facultyId)) {
          scheduleEntries.push({
            id: `${section}-${day}-${time}`,
            section,
            day,
            time,
            subject,
            faculty: sectionData.faculty[subject]
          });
        }
      });
    });
  });

  return scheduleEntries;
};

const getLocalRoomSchedule = (roomId) => {
  const foundSection = Object.entries(timetableData.sections).find(([, data]) => data.roomNumber === roomId);
  if (!foundSection) {
    return null;
  }

  const [section, data] = foundSection;
  return {
    roomNumber: data.roomNumber,
    section,
    schedule: data.schedule
  };
};

export const getTimetableData = async (section) => {
  if (!isFirebaseConfigured || !firestoreDb) {
    return getLocalTimetable(section);
  }

  try {
    const docRef = doc(firestoreDb, 'timetables', section);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
  } catch (error) {
    console.error('Error fetching timetable:', error);
    throw error;
  }
};

export const subscribeToTimetable = (section, callback) => {
  if (!isFirebaseConfigured || !firestoreDb) {
    const localTimetable = getLocalTimetable(section);
    callback(localTimetable);
    return () => {};
  }

  const docRef = doc(firestoreDb, 'timetables', section);
  return onSnapshot(docRef, (docSnapshot) => {
    callback(docSnapshot.exists() ? docSnapshot.data() : null);
  });
};

export const getFacultySchedule = async (facultyId) => {
  if (!isFirebaseConfigured || !firestoreDb) {
    return getLocalFacultySchedule(facultyId);
  }

  try {
    const q = query(
      collection(firestoreDb, 'schedules'),
      where('facultyId', '==', facultyId)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((docSnapshot) => ({ id: docSnapshot.id, ...docSnapshot.data() }));
  } catch (error) {
    console.error('Error fetching faculty schedule:', error);
    throw error;
  }
};

export const updateTimetable = async (section, data) => {
  if (!isFirebaseConfigured || !firestoreDb) {
    console.warn('Attempted to update timetable without Firebase configuration.');
    return;
  }

  try {
    const docRef = doc(firestoreDb, 'timetables', section);
    await setDoc(docRef, data, { merge: true });
  } catch (error) {
    console.error('Error updating timetable:', error);
    throw error;
  }
};

export const getRoomSchedule = async (roomId) => {
  if (!isFirebaseConfigured || !firestoreDb) {
    return getLocalRoomSchedule(roomId);
  }

  try {
    const docRef = doc(firestoreDb, 'rooms', roomId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
  } catch (error) {
    console.error('Error fetching room schedule:', error);
    throw error;
  }
};
