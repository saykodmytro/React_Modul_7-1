import React, { useEffect, useState } from 'react';

import { StyledModal } from './Styled';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from 'redux/modal/modal.reducer';

const Modal = () => {
  const modalData = useSelector(state => state.modal.modalData);
  const dispatch = useDispatch();
  const [counter, setCounter] = useState(1);

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        dispatch(closeModal());
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [dispatch]);

  const handleOverayClick = event => {
    if (event.target === event.currentTarget) {
      dispatch(closeModal());
    }
  };

  return (
    <StyledModal onClick={handleOverayClick}>
      <div className="modal">
        <button onClick={closeModal} className="closeBtn">
          ❌
        </button>
        <h2>Product Details</h2>
        <div>
          <h3>Title: {modalData.title}</h3>
          <p>Price: {modalData.price}$</p>
          <p>Discount: {modalData.discount}$</p>
        </div>
        <button onClick={() => setCounter(prev => prev + 1)}>
          Product count: {counter}
        </button>
      </div>
    </StyledModal>
  );
};

export default Modal;
