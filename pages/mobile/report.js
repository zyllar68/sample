import { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  MobileNavbar,
  Input,
  Table,
  Button,
  DropdownComponent,
} from "@/components";
import { format } from "date-fns";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";

const theadData = ["Agent ID", "Usher Dapitan 001"];

const Report = ({ data }) => {
  const { result, userId } = data;
  const [drawState, setDrawState] = useState(result);
  const [drawDropdown, setDrawDropdown] = useState("1");
  const [drawDate, setDrawDate] = useState(format(new Date(), "yyyy-MM-dd"));

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.get(
          `${
            process.env.NEXT_PUBLIC_API_BASE_URL
          }/report/${userId}?newDate=${format(
            new Date(drawDate),
            "MM-dd-yyyy"
          )}&drawTime=${drawDropdown}`,
          {
            headers: {
              "Content-Type": "application/json",
              "api-key": process.env.NEXT_PUBLIC_API_KEY,
            },
          }
        );
        setDrawState(result.data);
        console.log(drawDropdown);
      } catch (error) {
        alert("error!" + error);
      }
    }
    fetchData();
  }, [drawDate, drawDropdown, userId]);

  return (
    <div>
      <MobileNavbar title='Report' />
      <div className='mobileContent transaction'>
        <div className='transaction_filter'>
          <Input
            onChange={(e) => setDrawDate(e.target.value)}
            value={drawDate}
            type='date'
          />
          <DropdownComponent
            onChange={(e) => setDrawDropdown(e.target.value)}
            value={drawDropdown}
          />
          {/* <Button title='Generate' primary /> */}
        </div>
        <Table theadData={theadData}>
          <tr>
            <td>{drawDate}</td>
            <td>
              {drawDropdown === "2"
                ? "1st Draw (2pm)"
                : drawDropdown === "5"
                ? "2nd Draw (5pm)"
                : drawDropdown === "9"
                ? "3rd Draw (9pm)"
                : drawDropdown === "1" && "all"}
            </td>
          </tr>
          <tr>
            <td>Total Collection</td>
            <td>P {drawState}</td>
          </tr>
          <tr>
            <td>Remittance</td>
            <td>P {drawState - drawState * 0.2}</td>
          </tr>
          <tr>
            <td style={{ fontWeight: 700 }}>Total Commissions</td>
            <td style={{ fontWeight: 700 }}>
              P {(drawState * 0.2).toFixed(2)}
            </td>
          </tr>
          <tr>
            <td>Total Winnings</td>
            <td>P 5,000.00</td>
          </tr>
        </Table>
      </div>
    </div>
  );
};

export default Report;

export async function getServerSideProps(context) {
  const newDate = format(new Date(), "MM-dd-yyy");
  const cookies = context.req.cookies;
  const decoded = jwt.decode(cookies.token);

  try {
    const result = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/report/${decoded.userId}?newDate=${newDate}&drawTime=1`,
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
          result: result.data,
          userId: decoded.userId,
        },
      },
    };
  } catch (error) {
    return {
      props: {
        data: error.message,
      },
    };
  }
}
