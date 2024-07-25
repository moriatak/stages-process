import React from 'react';
// import './Modal.css';

function Modal({ closeModal, actionModal, title, text, paramsToAction, textActionButton }) {
  return (
    <div className="container-modal" >
      <div className="content-modal" style={{ margin: '31vh auto'}}>

        <div className='title-modal'>{title}</div>
        <div className='text-modal'>{text}</div>
        <div className='buttons-modal' style={!actionModal ? {justifyContent: 'center'} : {}}>
          <div className="close-button" onClick={() => closeModal()} >סגור</div>
          {actionModal && textActionButton && <div className='action-button'>
            <div className="submit-button" onClick={() => { actionModal(paramsToAction); closeModal(true); }} >{textActionButton}</div>
          </div>}
        </div>
      </div>

    </div>

  );
}

export default Modal;
