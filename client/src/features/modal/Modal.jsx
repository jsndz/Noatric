import "./modal.css";
import ReactDOM from "react-dom";

const Modal = ({ onClose, children }) => {
  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center modal-overlay">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className=" rounded-lg shadow-lg p-6 z-50 modal-content">
        {children}
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default Modal;
