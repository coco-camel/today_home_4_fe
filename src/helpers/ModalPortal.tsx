import React from 'react';
import ReactDOM from 'react-dom';

interface ModalPortalProps {
  children: React.ReactNode;
}

const ModalPortal: React.FC<ModalPortalProps> = ({
  children,
}) => {
  const el =
    document.getElementById('modal-root');
  if (!el) {
    return null;
  }
  return ReactDOM.createPortal(children, el);
};

export default ModalPortal;
