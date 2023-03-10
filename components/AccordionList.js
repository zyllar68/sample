import Accordion from "react-bootstrap/Accordion";
import { Table } from "@/components";

const theadData = ["Number", "Entry Amount", "type"];

const AccordionList = ({ accordionData }) => {
  return (
    <Accordion>
      {accordionData.map((item, i) => (
        <Accordion.Item eventKey={i} key={item._id}>
          <Accordion.Header>{item._id}</Accordion.Header>
          <Accordion.Body>
            <Table theadData={theadData}>
              {item.entryData.map((item, i) => (
                <tr key={i}>
                  <td>{item.number}</td>
                  <td>{item.amount}</td>
                  <td>{item.type}</td>
                </tr>
              ))}
            </Table>
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};

export default AccordionList;
