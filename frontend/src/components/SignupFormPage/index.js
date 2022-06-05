import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupFormPage from './signupform';


function SignupModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button id="splashpagebuttons" className='signupbutton' onClick={() => setShowModal(true)}>Sign Up</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignupFormPage setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default SignupModal;
