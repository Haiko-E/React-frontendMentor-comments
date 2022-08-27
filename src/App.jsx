import './App.scss';
import Comment from './components/Comment/Comment';
import Reply from './components/Reply/Reply';
import { getCurrentUser, getReplies } from './firebase/firebase';
import { useQuery } from 'react-query';
import { useState, useEffect } from 'react';
import { onSnapshot, query, collection, doc, getDoc } from 'firebase/firestore';
import db from './firebase/firebase';
import ReplyList from './components/Comment/ReplyList';

function App() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'comments'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      let result = [];
      snapshot.forEach((doc) => {
        result.push({ id: doc.id, path: doc.ref.path, ...doc.data() });
      });
      setComments(result);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const currentUser = useQuery(
    ['currentUser', 'juliusomo'],
    () => getCurrentUser('juliusomo'),
    { refetchOnWindowFocus: false }
  );

  if (currentUser.isSuccess) {
    return (
      <div>
        {comments.map((comment) => {
          return (
            <div key={comment.id} className='comment'>
              <Comment currentUser={currentUser.data} comment={comment} />

              {comment.replies.length > 0 && (
                <ReplyList currentUser={currentUser.data} comment={comment} />
              )}
            </div>
          );
        })}

        <Reply currentUser={currentUser.data} buttonText='SEND' />
      </div>
    );
  }
}

export default App;
