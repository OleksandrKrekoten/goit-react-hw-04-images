import { Overlay, Modal } from './Modal.styled';
import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types'; 
const ModalRoot = document.querySelector('#modal--root')
export function ModalWindow ({onClose,children}) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return ()=>{window.removeEventListener('keydown', handleKeyDown);}
  })
const  handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

 const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };return createPortal(
      <Overlay onClick={handleBackdropClick}>
        <Modal>
          {children}
        </Modal>
      </Overlay>,
      ModalRoot
    );
  
}
ModalWindow.propTypes = {
  onClose: PropTypes.func.isRequired
};