import './Reply.scss';
import React, { useEffect, useRef, useState } from 'react';

import { setComment, setReply } from '../../firebase/firebase';

const Reply = ({ setIsReply, buttonText, comment, currentUser }) => {
  const [replyText, setReplyText] = useState('');
  useEffect(() => {
    if (comment) {
      setReplyText(`@${comment.user.username} `);
    }
  }, [comment]);

  const handleReply = () => {
    if (comment) {
      setIsReply(false);
      setReply(currentUser, replyText, comment);
    } else {
      setComment(currentUser, replyText);
      setReplyText('');
    }
  };

  return (
    <div className='reply-box'>
      <img className='reply-avatar' src={currentUser.image} alt='' />
      <textarea
        onChange={(e) => setReplyText(e.target.value)}
        value={replyText}
        className='reply-textarea'
        type='text'
        name='reply'
        id='reply'
        placeholder='Add a comment'
      />
      <a onClick={handleReply} className='reply-btn' href='#reply'>
        {buttonText}
      </a>
    </div>
  );
};
// };

export default Reply;
