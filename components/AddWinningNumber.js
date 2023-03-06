import { useState } from "react";
import ReactModal from "react-modal";
import { Input, Button } from "@/components";
import axios from "axios";

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

const AddWinningNumber = ({ isOpen, closeModal, drawId }) => {
  const [winningNumber, setWinningNumber] = useState("");
  const [error, setError] = useState();

  const onAddWinninghandler = async () => {
    try {
      if (winningNumber !== "") {
        const collection = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/collections`,
          { drawId: drawId },
          {
            headers: {
              "Content-Type": "application/json",
              "api-key": process.env.NEXT_PUBLIC_API_KEY,
            },
          }
        );
        const result = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/winnings`,
          { winningNumber, drawId },
          {
            headers: {
              "Content-Type": "application/json",
              "api-key": process.env.NEXT_PUBLIC_API_KEY,
            },
          }
        );
        console.log(result);
        console.log(collection);
        location.reload();
      } else {
        setError("Please enter the winning number!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ReactModal isOpen={isOpen} style={customStyles}>
      <div className='addAccountModal'>
        <div className='addAccountModal__header'>Confirm Payment</div>
        <div className='addAccountModal__content'>
          <form className='addAccountModal__form'>
            <Input
              value={winningNumber}
              onChange={(e) => {
                setError("");
                setWinningNumber(e.target.value);
              }}
              marginTop='1.25rem'
              placeholder='3 Digit Number'
              onInput={(e) => {
                e.target.value = Math.max(0, parseInt(e.target.value))
                  .toString()
                  .slice(0, 3);
              }}
              type='number'
            />
            <p style={{ color: "red", fontSize: "14px", marginTop: "1rem" }}>
              {error}
            </p>
          </form>
        </div>
        <div className='addAccountModal__buttons'>
          <Button title='Close' onClick={closeModal} />
          <Button title='Save' onClick={onAddWinninghandler} primary />
        </div>
      </div>
    </ReactModal>
  );
};

export default AddWinningNumber;
