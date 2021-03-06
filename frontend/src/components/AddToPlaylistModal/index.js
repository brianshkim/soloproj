import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import AddToPlaylistForm from './addtoplaylist'

function AddToPlaylistModal({playlists, id}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="add-to-playlist" onClick={() => {playlists.length===0? setShowModal(false):setShowModal(true)}}><i class="fa-solid fa-scroll"></i></button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <AddToPlaylistForm id={id} closeModal={() => setShowModal(false)}/>
        </Modal>
      )}
    </>
  );
}

export default AddToPlaylistModal;
