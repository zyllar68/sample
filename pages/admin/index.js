import { WebNavbar, PageTitle, Button, Table } from "@/components";
import axios from "axios";

const theadData = [
  "Date",
  "Type",
  "Time Opened",
  "Time Closed",
  "Collected Bets",
  "Winning Number",
];

const index = ({ data }) => {
  const openDrawHandler = async () => {
    try {
      const res = await axios({
        method: "POST",
        url: "draw",
        headers: {
          "Content-Type": "application/json",
          "api-key": process.env.NEXT_PUBLIC_API_KEY,
        },
        baseURL: "https://swertres-v1.vercel.app/api/",
      });
      console.log(res.data);
    } catch (error) {}
  };
  return (
    <>
      <WebNavbar />
      <div className='web-cotnainer'>
        <PageTitle title='Draws'>
          <Button onClick={openDrawHandler} title='Open New Draw' primary />
        </PageTitle>
        <Table theadData={theadData} tbodyData={data} />
      </div>
    </>
  );
};

export default index;

export async function getServerSideProps(context) {
  try {
    const res = await axios({
      method: "GET",
      url: "draw",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.NEXT_PUBLIC_API_KEY,
      },
      baseURL: "https://swertres-v1.vercel.app/api/",
    });
    return {
      props: {
        data: res.data,
      },
    };
  } catch (error) {
    res.status(500).json({ message: `Internal server error ${error}` });
  }
}
