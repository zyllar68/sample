import { useState, useEffect } from "react";
import {
  WebNavbar,
  PageTitle,
  Button,
  Table,
  AddWinningNumber,
} from "@/components";
import axios from "axios";

import isAuthenticated from "@/lib/authenticateToken";

const theadData = [
  "Date",
  "Type",
  "Time Opened",
  "Status",
  "Collected Bets",
  "Winning Number",
];

const Admin = ({ data }) => {
  const [drawData, setDrawData] = useState(data);
  const [newDrawStatus, setNewDrawStatus] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);

  useEffect(() => {
    const result = drawData.some((item) => item.status === "open");
    if (result) {
      setNewDrawStatus(true);
    } else {
      setNewDrawStatus(false);
    }
  }, [drawData]);

  const openDrawHandler = async () => {
    setButtonLoading(!buttonLoading);
    const authToken = await isAuthenticated();
    if (authToken) {
      try {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/draw`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              "api-key": process.env.NEXT_PUBLIC_API_KEY,
            },
          }
        );
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/draw`,
          {
            headers: {
              "Content-Type": "application/json",
              "api-key": process.env.NEXT_PUBLIC_API_KEY,
            },
          }
        );

        setDrawData(res.data);
        setButtonLoading(!buttonLoading);
        location.reload();
      } catch (error) {}
    }
  };

  const closeDrawHandler = async (drawId) => {
    try {
      await axios({
        method: "POST",
        url: `draw/${drawId}`,
        headers: {
          "Content-Type": "application/json",
          "api-key": process.env.NEXT_PUBLIC_API_KEY,
        },
        baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
      });
      location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  if (!data) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <WebNavbar />
        <div className='web-cotnainer'>
          <PageTitle title='Draws'>
            {!newDrawStatus && (
              <Button
                onLoading={buttonLoading}
                onClick={openDrawHandler}
                title='Open New Draw'
                primary
              />
            )}
          </PageTitle>
          <Table
            theadData={theadData}
            tbodyData={drawData}
            closeDrawHandler={closeDrawHandler}
            modalShowHandler={() => setModalShow(true)}
          />
        </div>
        {drawData.length > 0 && (
          <AddWinningNumber
            isOpen={modalShow}
            closeModal={() => setModalShow(false)}
            drawId={drawData[0]._id}
          />
        )}
      </>
    );
  }
};

export default Admin;

export async function getServerSideProps(context) {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/draw`,
      {
        headers: {
          "Content-Type": "application/json",
          "api-key": process.env.NEXT_PUBLIC_API_KEY,
        },
      }
    );
    return {
      props: {
        data: res.data,
      },
    };
  } catch (error) {
    return {
      props: {
        error: true,
      },
    };
  }
}
