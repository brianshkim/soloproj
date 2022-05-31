import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreateSongForm from './SongForm';

function AddSongModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Add Song</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateSongForm />
        </Modal>
      )}
    </>
  );
}

export default AddSongModal;