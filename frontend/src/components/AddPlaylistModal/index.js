import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreatePlaylistForm from './PlaylistForm';

function AddPlaylistModal({id}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true) } class="addplaylistbutton">Add Playlist</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreatePlaylistForm closeModal={() => setShowModal(false)} />
        </Modal>
      )}
    </>
  );
}

export default AddPlaylistModal;
