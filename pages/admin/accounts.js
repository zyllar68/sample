import { WebNavbar, PageTitle, Button, Table, Input } from "@/components";
import { protectPage } from "@/lib/pageAuth";

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

  return {
    props: {
      // pass any necessary props to the protected page
    },
  };
}

const accounts = () => {
  return (
    <>
      <WebNavbar />
      <div className='web-cotnainer'>
        <PageTitle title='Account Management'>
          <div style={{ display: "flex", gap: "1rem" }}>
            <Button primary title='Create New' />
          </div>
        </PageTitle>
        <div style={{ display: "flex", gap: "1rem", marginBottom: "2.5rem" }}>
          <Input placeholder='Account Type' width='10.5rem' />
          <Input placeholder='Search Account' width='19rem' />
        </div>
        <Table theadData={theadData}>
          <tr>
            <td>U001</td>
            <td>Usher</td>
            <td>usher001</td>
            <td>usher001</td>
            <td>
              <Button primary title='Reset' />
            </td>
            <td>
              <Button primary title='Assign' />
            </td>
            <td>0999999999</td>
          </tr>
          <tr>
            <td>U001</td>
            <td>Usher</td>
            <td>usher001</td>
            <td>usher001</td>
            <td>
              <Button primary title='Reset' />
            </td>
            <td>
              <Button primary title='Assign' />
            </td>
            <td>0999999999</td>
          </tr>
        </Table>
      </div>
    </>
  );
};

export default accounts;
