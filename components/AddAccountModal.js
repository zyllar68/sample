import { useReducer, useState } from "react";
import { Modal, Input, Button } from "@/components";
import ReactModal from "react-modal";
import axios from "axios";

import isAuthenticated from "@/lib/authenticateToken";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    width: "32.25rem",
    padding: 0,
    transform: "translate(-50%, -50%)",
  },
};

const initialState = {
  username: "",
  password: "",
  accountType: "",
  name: "",
  phoneNumber: "",
  address: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "RESET":
      return initialState;
    case "update":
      return { ...state, [action.name]: action.value };
    default:
      return state;
  }
};

const AddAccountModal = ({ isOpen, closeModal }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [error, setError] = useState();

  const handleInputChange = () => {
    const { name, value } = event.target;
    dispatch({ type: "update", name, value });
    setError("");
  };

  const handleSubmitForm = async () => {
    const authToken = await isAuthenticated();
    if (
      state.username === "" ||
      state.password === "" ||
      state.accountType === "" ||
      state.name === "" ||
      state.address === "" ||
      state.phoneNumber === ""
    ) {
      return setError("All Fields are required!");
    }
    if (authToken) {
      try {
        const res = await axios({
          method: "POST",
          url: "users",
          headers: {
            "Content-Type": "application/json",
            "api-key": process.env.NEXT_PUBLIC_API_KEY,
          },
          baseURL: "http://localhost:3000/api/",
          data: {
            username: state.username,
            password: state.password,
            accountType: state.accountType,
            name: state.name,
            phoneNumber: state.phoneNumber,
            address: state.address,
          },
        });
        if (res.status === 200) {
          dispatch({ type: "RESET" });
          closeModal();
        } else {
          alert(
            "There is something wrong! please check your internet connection and try again!"
          );
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("You are not invited in this system get ou!");
    }
  };

  return (
    <ReactModal isOpen={isOpen} style={customStyles}>
      <div className='addAccountModal'>
        <div className='addAccountModal__header'>Create a new account</div>
        <div className='addAccountModal__content'>
          <form className='addAccountModal__form'>
            <Input
              name='accountType'
              value={state.accountType}
              onChange={handleInputChange}
              marginTop='1.25rem'
              placeholder='Account Type'
            />
            <Input
              name='username'
              value={state.username}
              onChange={handleInputChange}
              marginTop='1.25rem'
              placeholder='Username'
            />
            <Input
              name='password'
              value={state.password}
              onChange={handleInputChange}
              marginTop='1.25rem'
              type='password'
              placeholder='Password'
            />
            <Input
              name='name'
              value={state.name}
              onChange={handleInputChange}
              marginTop='1.25rem'
              placeholder='Name'
            />
            <Input
              name='phoneNumber'
              value={state.phoneNumber}
              onChange={handleInputChange}
              marginTop='1.25rem'
              type='number'
              placeholder='Phone Number'
            />
            <Input
              name='address'
              value={state.address}
              onChange={handleInputChange}
              marginTop='1.25rem'
              placeholder='Address'
            />
            <p style={{ color: "red", fontSize: "14px", marginTop: "1rem" }}>
              {error}
            </p>
          </form>
        </div>
        <div className='addAccountModal__buttons'>
          <Button title='Close' onClick={closeModal} />
          <Button onClick={handleSubmitForm} title='Create Account' primary />
        </div>
      </div>
    </ReactModal>
  );
};

export default AddAccountModal;
