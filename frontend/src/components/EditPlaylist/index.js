import React, { useState, useContext } from 'react';
import { Modal } from '../../context/Modal';
import EditPlaylist from './EditPlaylist'
import { idContext } from '../Home/Home';

function EditPlaylistModal({id}) {
  const [showModal, setShowModal] = useState(false);



  return (
    <>
      <button onClick={() => setShowModal(true) } id="editbuttontrack"><i class="fa-solid fa-pen"></i></button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditPlaylist id={id} closeModal={() => setShowModal(false)} />
        </Modal>
      )}
    </>
  );
}

export default EditPlaylistModal;
