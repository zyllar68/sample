import {
  WebNavbar,
  PageTitle,
  Button,
  Table,
  CardWrapper,
  Input,
} from "@/components";

const theadData = ["GenCoor", "Entries", "Winnings", "Payment Status", ""];

const Winnings = () => {
  return (
    <>
      <WebNavbar />
      <div className='web-cotnainer'>
        <PageTitle title='Winnings'>
          <div style={{ display: "flex", gap: "1rem" }}>
            <p>03-12-2023 1st Draw (2pm)</p>
            <Button primary title='Back' />
          </div>
        </PageTitle>
        <CardWrapper firstCardColor='peach' secondCardColor='light-black'>
          <div>
            <Input placeholder='Search Gen Coor' width='26.25rem' />
          </div>
        </CardWrapper>
        <Table theadData={theadData}>
          <tr>
            <td>Pedro</td>
            <td>P 100.00</td>
            <td>P 50,000.00</td>
            <td>Pending</td>
            <td>
              <Button primary title='Confirm Payment' />
            </td>
          </tr>
          <tr>
            <td>Pedro</td>
            <td>P 100.00</td>
            <td>P 50,000.00</td>
            <td>Pending</td>
            <td>
              <Button primary title='Confirm Payment' />
            </td>
          </tr>
        </Table>
      </div>
    </>
  );
};

export default Winnings;
