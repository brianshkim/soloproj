import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import AddToPlaylistForm from './addtoplaylist'

function AddToPlaylistModal({id}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Add to a playlist</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <AddToPlaylistForm id={id}/>
        </Modal>
      )}
    </>
  );
}

export default AddToPlaylistModal;
