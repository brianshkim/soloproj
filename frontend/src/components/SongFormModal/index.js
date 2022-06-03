import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreateSongForm from './SongForm';

function AddSongModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="addsongbutton" onClick={() => setShowModal(true)}>Add Song</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateSongForm closeModal={() => setShowModal(false)} />
        </Modal>
      )}
    </>
  );
}

export default AddSongModal;
