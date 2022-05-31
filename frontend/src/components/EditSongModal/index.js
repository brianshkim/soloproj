import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditSong from './EditSong'

function EditSongModal({id}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Edit</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditSong id={id}/>
        </Modal>
      )}
    </>
  );
}

export default EditSongModal;