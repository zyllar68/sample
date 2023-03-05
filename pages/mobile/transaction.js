import { MobileNavbar, Input, AccordionList } from "@/components";
import axios from "axios";
import jwt from "jsonwebtoken";

const theadData = ["Entry ID", "Number", "Amount"];
const tbodyData = [
  ["220223-2-001", "123", "P 10.00"],
  ["220223-2-001", "123", "P 10.00"],
  ["220223-2-001", "123", "P 10.00"],
];

const transaction = ({ data }) => {
  return (
    <div>
      <MobileNavbar title='Transaction' />
      <div className='mobileContent transaction'>
        <div className='transaction_filter'>
          <Input placeholder='03-01-2023' />
          <Input placeholder='All Draws' />
          <div className='transaction_totalCollected'>
            <p>P 100,000</p>
          </div>
        </div>
        <AccordionList accordionData={data} />
      </div>
    </div>
  );
};

export default transaction;

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
        data: result.data,
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
