import React, { useEffect, useRef } from 'react';
interface LoginModalProps {
  onClose: () => void;
}
const LoginModal: React.FC<
  LoginModalProps
> = () => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (modalRef.current) {
      const shadowRoot =
        modalRef.current.attachShadow({
          mode: 'open',
        });
      shadowRoot.innerHTML = `
        <div class="modal">
          ㅎㅇ
        </div>
      `;
    }
  }, []);

  return <div ref={modalRef}></div>;
};

export default LoginModal;
