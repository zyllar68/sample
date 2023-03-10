import { useState } from "react";
import axios from "axios";

import {
  WebNavbar,
  PageTitle,
  Button,
  Table,
  CardWrapper,
  Input,
} from "@/components";
import ReactModal from "react-modal";

import { useRouter } from "next/router";

const theadData = ["usher", "Entries", "Winnings", "Payment Status", ""];

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    width: "32.25rem",
    padding: 0,
    transform: "translate(-50%, -50%)",
  },
};

const Winnings = ({ data }) => {
  console.log(data);
  const router = useRouter();
  const [winningData, setWinningData] = useState(data.winningData);
  const [showModal, setShowModal] = useState(false);
  const [usherId, setUsherId] = useState();
  const [totalWinnings, setTotalWinnings] = useState(0);
  const [refNumber, setRefNumber] = useState();
  const [refError, setRefError] = useState();

  const submitRefHandler = async () => {
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/winnings/editRef`,
        {
          winningId: winningData[0]._id,
          usherListId: usherId,
          refNumber,
          totalWinnings,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "api-key": process.env.NEXT_PUBLIC_API_KEY,
          },
        }
      );
      location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {/* <WebNavbar />
      <div className='web-cotnainer'>
        <PageTitle title='Winnings'>
          <div style={{ display: "flex", gap: "1rem" }}>
            <p>03-12-2023 1st Draw (2pm)</p>
            <Button
              primary
              title='Back'
              onClick={() => router.push("/admin")}
            />
          </div>
        </PageTitle>
        <CardWrapper
          firstNumberTitle={winningData[0].overAllWinnings}
          secondNumberTitle={winningData[0].unPaidWinnings}
          firstBottomTitle='Total Winnings'
          secondBottomTitle='Unpaid Winnings'
          firstCardColor='peach'
          secondCardColor='light-black'
        ></CardWrapper>
        <Table theadData={theadData}>
          {winningData[0].usherList.map((item) => (
            <tr key={item._id}>
              <td>{item.userName}</td>
              <td>{item.totalEntriesWon}</td>
              <td>P {item.totalWinnings}</td>
              <td>
                {item.paymentStatus}
                {item.refNumber && `- ${item.refNumber}`}
              </td>
              <td>
                {item.paymentStatus === "pending" && (
                  <Button
                    primary
                    title='Confirm Payment'
                    onClick={() => {
                      setTotalWinnings(item.totalWinnings);
                      setUsherId(item._id);
                      setShowModal(true);
                    }}
                  />
                )}
              </td>
            </tr>
          ))}
        </Table>
      </div>
      <ReactModal isOpen={showModal} style={customStyles}>
        <div className='addAccountModal'>
          <div className='addAccountModal__header'>Confirm Payment</div>
          <div className='addAccountModal__content'>
            <form className='addAccountModal__form'>
              <Input
                value={refNumber}
                onChange={(e) => setRefNumber(e.target.value)}
                marginTop='1.25rem'
                placeholder='Ref. Number'
              />
              <p style={{ color: "red", fontSize: "14px", marginTop: "1rem" }}>
                {refError}
              </p>
            </form>
          </div>
          <div className='addAccountModal__buttons'>
            <Button title='Close' onClick={() => setShowModal(false)} />
            <Button onClick={submitRefHandler} title='Save Changes' primary />
          </div>
        </div>
      </ReactModal> */}
    </>
  );
};

export default Winnings;

export async function getServerSideProps(context) {
  try {
    const { id } = context.query;

    const result = await axios({
      method: "GET",
      url: `winnings/${id}`,
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.NEXT_PUBLIC_API_KEY,
      },
      baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    });

    const drawData = await axios(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/draw/${result.data[0].drawId}`,
      {
        headers: {
          "Content-Type": "application/json",
          "api-key": process.env.NEXT_PUBLIC_API_KEY,
        },
      }
    );
    console.log(drawData);
    return {
      props: {
        data: { winningData: result.data, drawData: drawData.data },
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
