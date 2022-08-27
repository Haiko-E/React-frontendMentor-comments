import React from 'react';
import CommentHeader from './CommentHeader';
import './Comment.scss';
import Vote from './Vote';
import Reply from '../Reply/Reply';
import { useState } from 'react';

const Comment = ({ comment, currentUser }) => {
  const [isReply, setIsReply] = useState(false);

  return (
    <>
      <div className={'comment-box '}>
        <Vote currentUser={currentUser} comment={comment} votes={comment.score} />
        <CommentHeader
          currentUser={currentUser}
          comment={comment}
          setIsReply={setIsReply}
          isReply={isReply}
        />
      </div>
      {isReply && (
        <Reply
          setIsReply={setIsReply}
          buttonText='REPLY'
          currentUser={currentUser}
          comment={comment}
        />
      )}
    </>
  );
};

export default Comment;
