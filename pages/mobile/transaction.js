import { MobileNavbar, Input, Table } from "@/components";

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
        <Table theadData={theadData} tbodyData={tbodyData} />
      </div>
    </div>
  );
};

export default transaction;
