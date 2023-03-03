import { useState, useEffect } from "react";
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

const Admin = ({ data }) => {
  const [drawData, setDrawData] = useState(data);
  const [newDrawStatus, setNewDrawStatus] = useState(false);

  useEffect(() => {
    const result = drawData.find((item) => item.timeClosed === "open");
    if (result) {
      setNewDrawStatus(true);
    } else {
      setNewDrawStatus(false);
    }
    console.log(result);
  }, [drawData]);

  const openDrawHandler = async () => {
    try {
      await axios({
        method: "POST",
        url: "draw",
        headers: {
          "Content-Type": "application/json",
          "api-key": process.env.NEXT_PUBLIC_API_KEY,
        },
        baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
      });

      const drawRes = await axios({
        method: "GET",
        url: "draw",
        headers: {
          "Content-Type": "application/json",
          "api-key": process.env.NEXT_PUBLIC_API_KEY,
        },
        baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
      });

      setDrawData(drawRes.data);
    } catch (error) {}
  };
  return (
    <>
      <WebNavbar />
      <div className='web-cotnainer'>
        <PageTitle title='Draws'>
          {!newDrawStatus && (
            <Button onClick={openDrawHandler} title='Open New Draw' primary />
          )}
        </PageTitle>
        <Table theadData={theadData} tbodyData={drawData} />
      </div>
    </>
  );
};

export default Admin;

export async function getServerSideProps(context) {
  try {
    const res = await axios({
      method: "GET",
      url: "draw",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.NEXT_PUBLIC_API_KEY,
      },
      baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
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
