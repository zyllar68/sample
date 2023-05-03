import { useState } from "react";
import {
  WebNavbar,
  Input,
  PageTitle,
  Button,
  Table,
  CardWrapper,
} from "@/components";
import ReactModal from "react-modal";
import axios from "axios";
import { useRouter } from "next/router";

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

const theadData = ["Usher", "Total Collected", "Remittance Status"];

const Transaction = ({ data }) => {
  const router = useRouter();
  const [collectionState, setCollectionState] = useState(data);
  const [showModal, setShowModal] = useState(false);
  const [usherCollection, setUsherCollection] = useState();
  const [refNumber, setRefNumber] = useState();
  const [refError, setRefError] = useState();
  const [totalCollection, setTotalCollection] = useState();

  const submitRefHandler = async () => {
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/collections/editRef`,
        {
          collectionId: collectionState[0]._id,
          usherListId: usherCollection,
          refNumber,
          totalCollection,
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
      <WebNavbar />
      <div className='web-cotnainer'>
        <PageTitle title='Winnings'>
          <div style={{ display: "flex" }}>
            <p>03-12-2023 1st Draw (2pm)</p>
            <Button
              title='Back'
              primary
              onClick={() => {
                router.back();
              }}
            />
          </div>
        </PageTitle>
        <CardWrapper
          firstNumberTitle={collectionState[0].overAllCollection}
          secondNumberTitle={collectionState[0].unPaidCollection}
          firstBottomTitle='Total Collections'
          secondBottomTitle='Unremitted Collections'
          firstCardColor='primary'
          secondCardColor='light-black'
        />
        <Table theadData={theadData}>
          {collectionState[0].collectionList.map((item) => {
            console.log(item);
            return (
              <tr key={item._id}>
                <td>{item.fullName}</td>
                <td>P {item.totalCollection}</td>
                <td>
                  {item.totalCollection > 0 && item.paymentStatus}
                  {item.refNumber && `- ${item.refNumber}`}
                </td>
                <td>
                  {item.totalCollection > 0 &&
                    item.paymentStatus === "pending" && (
                      <Button
                        primary
                        title='Confirm Payment'
                        onClick={() => {
                          setTotalCollection(item.totalCollection);
                          setUsherCollection(item._id);
                          setShowModal(true);
                        }}
                      />
                    )}
                </td>
              </tr>
            );
          })}
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
      </ReactModal>
    </>
  );
};

export default Transaction;

export async function getServerSideProps(context) {
  const { drawId } = context.query;
  try {
    const result = await axios({
      method: "GET",
      url: `collections`,
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.NEXT_PUBLIC_API_KEY,
      },
      baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
      data: {
        drawId: drawId,
      },
    });
    console.log(result.data[0].collectionList);
    return {
      props: {
        data: result.data,
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
