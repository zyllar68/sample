import { MobileNavbar, Input, Button, Table } from "@/components";

const theadData = ["Number", "Amount", "Type"];
const tbodyData = [
  ["123", "10.00", "Target"],
  ["123", "10.00", "Rambol"],
  ["123", "10.00", "Target"],
];

const index = () => {
  return (
    <div>
      <MobileNavbar />
      <div className='mobileContent'>
        <p className='mobileContent_drawTime'>
          Draw: 03-22-2023 1st Draw (2pm)
        </p>
        <form className='mobileContent_form'>
          <Input placeholder='Number' type='number' />
          <Input placeholder='Amount' type='number' />
          <Button title='Target' primary />
          <Button title='Rambol' primary />
          <div className='div'>
            <p>Total: P10000000000000</p>
          </div>
          <Button title='Submit' />
        </form>
        <Table theadData={theadData} tbodyData={tbodyData} />
      </div>
    </div>
  );
};

export default index;
