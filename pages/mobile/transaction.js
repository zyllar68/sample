import { useState, useEffect } from "react";
import { format } from "date-fns";
import {
  MobileNavbar,
  Input,
  AccordionList,
  DropdownComponent,
} from "@/components";
import axios from "axios";
import jwt from "jsonwebtoken";

const Transaction = ({ data }) => {
  const [transactionState, setTransactionState] = useState(data.transData);
  const [selectedDrawTime, setSelectedDrawTime] = useState("all");
  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), "yyyy-MM-dd")
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/entries/${data.usherId}?createdAt=${selectedDate}&drawTime=${selectedDrawTime}`,
          {
            headers: {
              "Content-Type": "application/json",
              "api-key": process.env.NEXT_PUBLIC_API_KEY,
            },
          }
        );
        setTransactionState(result.data);
        console.log(selectedDrawTime);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [selectedDate, data.usherId, selectedDrawTime]);

  return (
    <div>
      <MobileNavbar title='Transaction' />
      <div className='mobileContent transaction'>
        <div className='transaction_filter'>
          <Input
            type='date'
            value={selectedDate}
            onChange={(e) => {
              setSelectedDate(e.target.value);
              console.log(e.target.value);
            }}
          />
          <DropdownComponent
            selectedValue={selectedDrawTime}
            onChange={(e) => setSelectedDrawTime(e.target.value)}
          />
          {/* <div className='transaction_totalCollected'>
            <p>P 100,000</p>
          </div> */}
        </div>
        <AccordionList accordionData={transactionState} />
      </div>
    </div>
  );
};

export default Transaction;

export async function getServerSideProps(context) {
  try {
    const cookies = context.req.cookies;
    const decoded = jwt.decode(cookies.token);
    const result = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/entries/${decoded.userId}`,
      {
        headers: {
          "Content-Type": "application/json",
          "api-key": process.env.NEXT_PUBLIC_API_KEY,
        },
      }
    );
    return {
      props: {
        data: {
          usherId: decoded.userId,
          transData: result.data,
        },
      },
    };
  } catch (error) {
    return {
      props: {
        data: error,
      },
    };
  }
}
