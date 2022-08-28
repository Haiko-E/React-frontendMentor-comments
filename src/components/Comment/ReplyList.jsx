import React, { useEffect, useState } from 'react';
import { collection, doc, onSnapshot, query } from 'firebase/firestore';
import db from '../../firebase/firebase';
import './ReplyList.scss';
import Comment from './Comment';

const ReplyList = ({ comment, currentUser }) => {
  const [replies, setReplies] = useState([]);

  useEffect(() => {
    const q = query(collection(db, comment.path, 'replies'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      let result = [];
      snapshot.forEach((doc) => {
        result.push({ id: doc.id, path: doc.ref.path, ...doc.data() });
      });
      setReplies(result);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className='replies'>
      <div className='sidebar'></div>
      {replies.map((reply) => {
        return (
          <Comment
            key={`reply=${reply.id}`}
            comment={reply}
            currentUser={currentUser}
          />
        );
      })}
    </div>
  );
};

export default ReplyList;
