import {
  WebNavbar,
  PageTitle,
  Button,
  Table,
  CardWrapper,
  Input,
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

const Transaction = () => {
  return (
    <>
      <WebNavbar />
      <div className='web-cotnainer'>
        <PageTitle title='Draws'>
          <p>03-12-2023 1st Draw (2pm)</p>
        </PageTitle>
        <CardWrapper>
          {/* <Button title='Close Draw' primary /> */}
          {/* <div style={{ display: "flex", alignItems: "center", gap: ".7rem" }}>
            <Input placeholder='Enter Result' />
            <Button title='Confirm' primary />
          </div> */}
          <p
            style={{ fontWeight: "600", fontSize: "1.5rem", color: "#343A40" }}
          >
            Winning Number: 123
          </p>
        </CardWrapper>
        <Table theadData={theadData} tbodyData={tbodyData} />
      </div>
    </>
  );
};

export default Transaction;
