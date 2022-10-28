import { Overlay, Modal } from './Modal.styled';
import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types'; 
const ModalRoot = document.querySelector('#modal--root')
export class ModalWindow extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }
  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };
  render() {
    return createPortal(
      <Overlay onClick={this.handleBackdropClick}>
        <Modal>
          {this.props.children}
        </Modal>
      </Overlay>,
      ModalRoot
    );
  }
}
ModalWindow.propTypes = {
  onClose: PropTypes.func.isRequired
};