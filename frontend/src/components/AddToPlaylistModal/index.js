import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import AddToPlaylist from './addtoplaylist'

function AddToPlaylistModal({id}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Add to a playlist</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <AddToPlaylist/>
        </Modal>
      )}
    </>
  );
}

export default AddToPlaylistModal;
