import {
  getFirestore,
  collection,
  getDocs,
  updateDoc,
  addDoc,
  doc,
  query,
  where,
  Timestamp,
  arrayUnion,
} from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
  storageBucket: import.meta.env.VITE_FIREBASE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_SENDERID,
  appId: import.meta.env.VITE_FIREBASE_API_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

// Firebase functions

//** GETTERS */

export const getReplies = async (docID) => {
  console.log('fetching replies');
  const q = query(
    collection(db, 'comments', docID, 'replies'),
    orderBy('createdAt')
  );
  const replies = await getDocs(q);
  let result = [];

  replies.forEach((doc) => result.push({ id: doc.id, ...doc.data() }));
  return result;
};

export const getCurrentUser = async (username) => {
  const q = query(collection(db, 'Users'), where('username', '==', username));
  const currentUser = await getDocs(q);
  let result;

  currentUser.forEach((doc) => (result = doc.data()));
  return result;
};

//** SETTERS */

export const setComment = async (user, content) => {
  const createdAt = Timestamp.now();
  await addDoc(collection(db, 'comments'), {
    user: {
      username: user.username,
      image: user.image,
    },
    content,
    createdAt,
    score: 0,
    replies: [],
    upVotes: [],
    downVotes: [],
  });
};

export const setReply = async (user, content, comment) => {
  const path = comment.path.slice(0, 29);
  const replyNameExcists = content.includes(`@${comment.user.username}`);

  // remove @username from content, @username gets added
  if (replyNameExcists) {
    content = content.replace(`@${comment.user.username}`, '');
  }

  const q = query(collection(db, path, '/replies'));
  const createdAt = Timestamp.now();

  const docRef = await addDoc(q, {
    user: {
      username: user.username,
      image: user.image,
    },
    content,
    createdAt,
    score: 0,
    replies: [],
    replyingTo: comment.user.username,
    upVotes: [],
    downVotes: [],
    parrentPath: comment.path,
  });

  await updateDoc(doc(db, comment.path), {
    replies: arrayUnion(doc(db, docRef.path)),
  });
};

export default db;
