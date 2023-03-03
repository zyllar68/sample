import {
  WebNavbar,
  PageTitle,
  Button,
  Table,
  Modal,
  Input,
} from "@/components";

const theadData = ["March 01, 2023", "March 31, 2023"];

const Financial = () => {
  return (
    <>
      <Modal />
      <WebNavbar />
      <div className='web-cotnainer'>
        <PageTitle title='Financial Reports' />
        <p style={{ marginBottom: "1.25rem" }}>Data Filters</p>
        <div style={{ display: "flex", gap: "1rem", marginBottom: "2.5rem" }}>
          <Input placeholder='Date Start' width='10.5rem' />
          <Input placeholder='Date End' width='10.5rem' />
          <Input placeholder='All Draws' width='19rem' />
          <Button title='Generate' primary />
        </div>
        <Table theadText='left' theadData={theadData} width='27.5625rem'>
          <tr className='text-left'>
            <td>Total Draws</td>
            <td>90</td>
          </tr>
          <tr className='text-left'>
            <td>Total Collection</td>
            <td>P 20,000,000.00</td>
          </tr>
          <tr className='text-left'>
            <td>Total Winnings</td>
            <td>P 6,500,000.00</td>
          </tr>
          <tr className='text-left'>
            <td>GenCoor and Usher</td>
            <td>P 5,000,000.00</td>
          </tr>
          <tr className='text-left'>
            <td>System Charge</td>
            <td>P 1,400,000.00</td>
          </tr>
          <tr className='text-left'>
            <td>Expenses</td>
            <td>P 2,800,000.00</td>
          </tr>
          <tr className='font-bold text-left'>
            <td>Net Profit</td>
            <td>P 4,300,000.00</td>
          </tr>
        </Table>
      </div>
    </>
  );
};

export default Financial;
