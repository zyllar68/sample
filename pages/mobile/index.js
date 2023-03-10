import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import axios from "axios";

import { MobileNavbar, Input, Button, Table } from "@/components";

const theadData = ["Number", "Amount", "Type"];

const Index = (data) => {
  const [number, setNumber] = useState();
  const [amount, setAmount] = useState();
  const [totalAmount, setTotalAmount] = useState(null);
  const [numberList, setNumberList] = useState([]);

  const addNumberHandler = (type) => {
    if (number && amount) {
      if (number.length === 3) {
        if (type === "target") {
          const newTarget = {
            amount: parseInt(amount),
            number: parseInt(number),
            type: "target",
          };
          setNumberList([...numberList, newTarget]);
          setNumber("");
          setAmount("");
          setTotalAmount(totalAmount + parseInt(amount));
        } else {
          if (amount % 6 === 0) {
            const newTarget = {
              amount: parseInt(amount),
              number,
              type: "rambol",
            };
            setNumberList([...numberList, newTarget]);
            setNumber("");
            setAmount("");
            setTotalAmount(totalAmount + parseInt(amount));
          } else {
            alert(
              "Please enter an amount that can be divided to the rumble number!"
            );
          }
        }
      } else {
        alert("Please input not less than 3 digit number!");
      }
    } else {
      alert("All fields are required!");
    }
  };

  const removeNumberHandler = (index, amount) => {
    const newList = numberList.filter((item, i) => i !== index);
    setNumberList(newList);
    setTotalAmount(totalAmount - parseInt(amount));
  };

  const submitNumberHandler = async () => {
    const cookieData = Cookies.get("token");
    const decoded = jwt.decode(cookieData);
    try {
      const entry = {
        userId: decoded.userId,
        fullName: decoded.accountName,
        drawId: data.data._id,
        drawTime: data.data.drawTime,
        entryData: numberList,
        totalAmount,
      };
      const result = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/entries`,
        entry,
        {
          headers: {
            "Content-Type": "application/json",
            "api-key": process.env.NEXT_PUBLIC_API_KEY,
          },
        }
      );
      setNumberList([]);
      setTotalAmount(null);
    } catch (error) {
      alert(
        "There was an error while saving! please check your internet connection and try again!"
      );
    }
  };

  return (
    <div>
      <MobileNavbar title='Home' />
      <div className='mobileContent'>
        {data.data === null ? (
          <h1>Draw is closed. Please wait for the next draw</h1>
        ) : (
          <>
            <p className='mobileContent_drawTime'>
              Draw: {data.data.drawDate}{" "}
              {data.data.drawTime === 2
                ? "1st Draw (2pm)"
                : data.data.drawTime === 5
                ? "2nd Draw (5pm)"
                : data.data.drawTime === 9 && "3rd Draw (9pm)"}
            </p>
            <form className='mobileContent_form'>
              <Input
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                onInput={(e) => {
                  e.target.value = Math.max(0, parseInt(e.target.value))
                    .toString()
                    .slice(0, 3);
                }}
                placeholder='Number'
                type='number'
              />
              <Input
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder='Amount'
                type='number'
              />
              <Button
                title='Target'
                primary
                onClick={() => addNumberHandler("target")}
              />
              <Button
                title='Rambol'
                primary
                onClick={() => addNumberHandler("rambol")}
              />
              <div className='div'>
                <p>Total: P{totalAmount}</p>
              </div>
              <Button onClick={() => submitNumberHandler()} title='Submit' />
            </form>
            <Table theadData={theadData}>
              {numberList.map((item, i) => (
                <tr key={i}>
                  <td>{item.number}</td>
                  <td>{item.amount}</td>
                  <td>{item.type}</td>
                  <td
                    style={{ color: "red" }}
                    onClick={() => removeNumberHandler(i, item.amount)}
                  >
                    remove
                  </td>
                </tr>
              ))}
            </Table>
          </>
        )}
      </div>
    </div>
  );
};

export default Index;

export async function getServerSideProps(context) {
  try {
    const result = await axios({
      method: "GET",
      url: "/draw/open",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.NEXT_PUBLIC_API_KEY,
      },
      baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    });
    return {
      props: {
        data: result.data,
      },
    };
  } catch (error) {
    return {
      props: {
        error: true,
      },
    };
  }
}
