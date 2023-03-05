import { WebNavbar, PageTitle, Button, Table, CardWrapper } from "@/components";

const tbodyData = [
  ["220223-2-001", "123", "P 10.00", "02-22-2023 09:59AM", "Juan", "Pedro"],
  ["220223-2-001", "123", "P 10.00", "02-22-2023 09:59AM", "Juan", "Pedro"],
];

const theadData = ["Usher", "Entries", "Total Collected", "Remittance Status"];

const Transaction = () => {
  return (
    <>
      <WebNavbar />
      <div className='web-cotnainer'>
        <PageTitle title='Winnings'>
          <div style={{ display: "flex" }}>
            <p>03-12-2023 1st Draw (2pm)</p>
            <Button title='Back' primary />
          </div>
        </PageTitle>
        <CardWrapper firstCardColor='peach' secondCardColor='light-black' />
        <Table theadData={theadData}></Table>
      </div>
    </>
  );
};

export default Transaction;

export async function getServerSideProps(context) {
  try {
  } catch (error) {
    return {
      props: {
        error: true,
      },
    };
  }
}
