import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm'

function LoginFormModal({id}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button class="loginbutton" id="splashpagebuttons" onClick={() => setShowModal(true)}>Log in</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm />
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;
