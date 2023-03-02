import ReactModal from "react-modal";
import { Input, Button } from "@/components";

ReactModal.setAppElement("#root");

const Modal = ({ children, isOpen, closeModal, handleSubmitForm }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      closeModal={closeModal}
      style={customStyles}
      className='addAccountModal'
    ></ReactModal>
  );
};

export default Modal;
