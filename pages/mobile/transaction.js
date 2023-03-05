import { MobileNavbar, Input, AccordionList } from "@/components";

const theadData = ["Entry ID", "Number", "Amount"];
const tbodyData = [
  ["220223-2-001", "123", "P 10.00"],
  ["220223-2-001", "123", "P 10.00"],
  ["220223-2-001", "123", "P 10.00"],
];

const transaction = () => {
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
        {/* <Table theadData={theadData} tbodyData={tbodyData} /> */}
        <AccordionList />
      </div>
    </div>
  );
};

export default transaction;

export async function getServerSideProps(context) {
  try {
    const result = await axios({
      method: "GET",
      url: "/draw/entries",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.NEXT_PUBLIC_API_KEY,
      },
      baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    });
    return {
      props: {
        // data: result.data,
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
