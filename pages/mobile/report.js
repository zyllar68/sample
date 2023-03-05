import { useState } from "react";
import {
  MobileNavbar,
  Input,
  Table,
  Button,
  DropdownComponent,
} from "@/components";
import { format, subDays } from "date-fns";

const theadData = ["Agent ID", "Usher Dapitan 001"];

const Report = () => {
  const yesterday = subDays(new Date(), 1);

  const [drawDropdown, setDrawDropdown] = useState();
  const [drawDate, setDrawDate] = useState(format(yesterday, "yyyy-MM-dd"));

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
          <Button title='Generate' primary />
        </div>
        <Table theadData={theadData}>
          <tr>
            <td>03-01-2023</td>
            <td>All Draws</td>
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
  try {
    const cookies = context.req.cookies;
    const decoded = jwt.decode(cookies.token);
    console.log(decoded);
    // const result = await axios.get(
    //   `${process.env.NEXT_PUBLIC_API_BASE_URL}/entries/${decoded.userId}`,
    //   {
    //     headers: {
    //       "Content-Type": "application/json",
    //       "api-key": process.env.NEXT_PUBLIC_API_KEY,
    //     },
    //   }
    // );

    return {
      props: {
        // data: result.data,
      },
    };
  } catch (error) {
    return {
      props: {
        // data: error,
      },
    };
  }
}
