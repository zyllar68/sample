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

const theadData = ["Agent ID", "Usher Dapitan 001"];

const Report = ({ data }) => {
  console.log(data);
  const [drawDropdown, setDrawDropdown] = useState("1");
  const [drawDate, setDrawDate] = useState(format(new Date(), "yyyy-MM-dd"));

  useEffect(() => {}, [drawDate, drawDropdown]);

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
            <td>P 10,000.00</td>
          </tr>
          <tr>
            <td>Remittance</td>
            <td>P 8,000.00</td>
          </tr>
          <tr>
            <td style={{ fontWeight: 700 }}>Total Commissions</td>
            <td style={{ fontWeight: 700 }}>P 2,000.00</td>
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

  try {
    const result = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/report?newDate=${newDate}&drawTime=1`,
      {
        headers: {
          "Content-Type": "application/json",
          "api-key": process.env.NEXT_PUBLIC_API_KEY,
        },
      }
    );
    return {
      props: {
        data: result,
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
