import { useEffect, useState } from "react";
import {
  WebNavbar,
  PageTitle,
  Button,
  Table,
  Input,
  AddAccountModal,
} from "@/components";
import { protectPage } from "@/lib/pageAuth";
import axios from "axios";

const theadData = ["Account ID", "Type", "Name", "Username", "Phone Number"];

const Accounts = ({ data }) => {
  const [modal, setModal] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUsers(data);
  }, [data]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <AddAccountModal
        isOpen={modal}
        closeModal={() => setModal(!modal)}
        setUsers={setUsers}
      />
      <WebNavbar />
      <div className='web-cotnainer'>
        <PageTitle title='Account Management'>
          <div style={{ display: "flex", gap: "1rem" }}>
            <Button
              primary
              title='Create New'
              onClick={() => setModal(!modal)}
            />
          </div>
        </PageTitle>
        {/* <div style={{ display: "flex", gap: "1rem", marginBottom: "2.5rem" }}>
          <Input placeholder='Account Type' width='10.5rem' />
          <Input placeholder='Search Account' width='19rem' />
        </div> */}
        <Table theadData={theadData}>
          {users.map(
            ({ _id, accountType, fullName, phoneNumber, username }) => (
              <tr key={_id}>
                <td>{_id}</td>
                <td>{accountType}</td>
                <td>{fullName}</td>
                <td>{username}</td>
                <td>{phoneNumber}</td>
              </tr>
            )
          )}
        </Table>
      </div>
    </>
  );
};

export default Accounts;

export async function getServerSideProps(context) {
  // use protectPage function to check JWT token
  const protectedPage = await protectPage(context);

  // if the user is not authenticated, redirect to login page
  if (protectedPage && "redirect" in protectedPage) {
    return protectedPage;
  }

  try {
    const res = await axios({
      method: "GET",
      url: "users",
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
    console.log(error);
  }
}
