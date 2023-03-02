import { useState } from "react";
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

const theadData = [
  "Account ID",
  "Type",
  "Name",
  "Username",
  "Password",
  "GenCoor",
  "Phone Number",
];

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
      baseURL: "http://localhost:3000/api/",
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

const accounts = ({ data }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [modal, setModal] = useState(false);
  const [users, setUsers] = useState(data);

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
        <div style={{ display: "flex", gap: "1rem", marginBottom: "2.5rem" }}>
          <Input placeholder='Account Type' width='10.5rem' />
          <Input placeholder='Search Account' width='19rem' />
        </div>
        <Table theadData={theadData}>
          {users.map(({ _id, accountType, name, phoneNumber }) => (
            <tr key={_id}>
              <td>{_id}</td>
              <td>{accountType}</td>
              <td>{name}</td>
              <td>usher001</td>
              <td>
                <Button primary title='Reset' />
              </td>
              <td>
                <Button primary title='Assign' />
              </td>
              <td>{phoneNumber}</td>
            </tr>
          ))}
        </Table>
      </div>
    </>
  );
};

export default accounts;
