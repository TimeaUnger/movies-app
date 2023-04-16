import React from "react";
import ReactDOM from "react-dom";
import "./Dialog.css";
import FocusTrap from "focus-trap-react";
 
const Dialog = (props) => {

  const handleCloseModal = () => {
		props.handleCloseModal();
	}

  const modalVisibility = !props.modalOpen ? 'closed' : '';
  const focusTrapIsActvie = !props.modalOpen ? false : true;

  return ReactDOM.createPortal(
    <FocusTrap active={focusTrapIsActvie}>
      <div className={`dialog-container ${modalVisibility}`} id="dialogContainer">
        <div className="closeButton" onClick={handleCloseModal}>X</div>
        <div className="modal">{props.children}</div>
      </div>
    </FocusTrap>,
    document.getElementById('portal-root') || document.createElement('div') 
  );
};
 
export default Dialog;