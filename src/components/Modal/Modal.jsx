import db from '../../firebase/firebase';
import { arrayRemove, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import React from 'react';
import Button from '../UI/Button';
import './Modal.scss';

const Modal = ({ showModal, comment }) => {
  const deleteHandler = async (path) => {
    // delete reference from the parrent
    if (comment.parrentPath) {
      await updateDoc(doc(db, comment.parrentPath), {
        replies: arrayRemove(doc(db, comment.path)),
      });
    }
    //delete reply from replies
    await deleteDoc(doc(db, path));
    showModal(false);
  };

  const cancelHandler = () => {
    showModal(false);
  };

  return (
    <div onClick={cancelHandler} className='modal'>
      <div className='overlay-container'>
        <h2>Delete Comment</h2>
        <p className='overlay-text'>
          Are you sure you want to delete this comment, this will remove the comment
          and can't be undone
        </p>
        <div className='overlay-buttons'>
          <Button
            onClick={cancelHandler}
            style={{ backgroundColor: 'hsl(211, 10%, 45%)' }}
          >
            NO, CANCEL
          </Button>
          <Button
            onClick={() => deleteHandler(comment.path)}
            style={{ backgroundColor: 'hsl(358, 79%, 66%)' }}
          >
            YES, DELETE
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
