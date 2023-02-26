import { WebNavbar, PageTitle, Button, Table } from "@/components";

const theadData = [
  "Date",
  "Type",
  "Time Opened",
  "Time Closed",
  "Collected Bets",
  "Winning Number",
];

const tbodyData = [
  ["03-12-2023", "2nd Draw (5pm)", "02:00 PM", "Open", "P 50,000.00", "123"],
  ["03-12-2023", "2nd Draw (5pm)", "02:00 PM", "Open", "P 50,000.00", "123"],
];

const index = () => {
  return (
    <>
      <WebNavbar />
      <div className='web-cotnainer'>
        <PageTitle title='Draws'>
          <Button title='Open New Draw' primary />
        </PageTitle>
        <Table theadData={theadData} tbodyData={tbodyData} />
      </div>
    </>
  );
};

export default index;
