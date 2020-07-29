import * as React from 'react';
import { Button } from 'baseui/button';
import { Modal as ModalContainer, SIZE } from 'baseui/modal';

const ModalProduct = ({ isOpen, onClose, children }) => {
  return (
    <ModalContainer
      onClose={onClose}
      isOpen={isOpen}
      size={SIZE.auto}
      overrides={{
        Dialog: {
          style: {
            maxWidth: '1020px',
            maxHeight: '80vh',
            overflow: 'auto',
            WebkitScrollSnapType: 'hidden',
          },
        },
      }}
    >
      {children}
    </ModalContainer>
  );
};

export default ModalProduct;
