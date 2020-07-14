import * as React from 'react';
import { Button } from 'baseui/button';
import {
  Modal as ModalContainer,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
} from 'baseui/modal';

const Modal = ({ opened, onClose, onCancel, onConfirm, title, children }) => {
  return (
    <React.Fragment>
      <ModalContainer onClose={onClose} isOpen={opened}>
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          <ModalButton kind="tertiary" onClick={onCancel}>
            Cancelar
          </ModalButton>
          <ModalButton onClick={onConfirm}>Confirmar</ModalButton>
        </ModalFooter>
      </ModalContainer>
    </React.Fragment>
  );
};

export default Modal;
