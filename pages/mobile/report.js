import { MobileNavbar, Input, Table, Button } from "@/components";

const theadData = ["Agent ID", "Usher Dapitan 001"];

const Report = () => {
  return (
    <div>
      <MobileNavbar title='Report' />
      <div className='mobileContent transaction'>
        <div className='transaction_filter'>
          <Input placeholder='03-01-2023' />
          <Input placeholder='All Draws' />
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
