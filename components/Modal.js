import ReactModal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

ReactModal.setAppElement("#root");

const Modal = () => {
  return (
    <ReactModal isOpen style={customStyles}>
      <h2>Hello</h2>
    </ReactModal>
  );
};

export default Modal;
