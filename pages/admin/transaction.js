import {
  WebNavbar,
  PageTitle,
  Button,
  Table,
  CardWrapper,
  Card,
} from "@/components";

const theadData = [
  "Entry ID",
  "Number",
  "Entry Amount",
  "Date Time",
  "Usher",
  "GenCoor",
];

const tbodyData = [
  ["220223-2-001", "123", "P 10.00", "02-22-2023 09:59AM", "Juan", "Pedro"],
  ["220223-2-001", "123", "P 10.00", "02-22-2023 09:59AM", "Juan", "Pedro"],
];

const transaction = () => {
  return (
    <>
      <WebNavbar />
      <div className='web-cotnainer'>
        <PageTitle title='Draws'>
          <p>03-12-2023 1st Draw (2pm)</p>
        </PageTitle>
        <CardWrapper>yeah</CardWrapper>
        <Table theadData={theadData} tbodyData={tbodyData} />
      </div>
    </>
  );
};

export default transaction;
