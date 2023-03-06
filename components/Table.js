import { useRouter } from "next/router";
import classNames from "classnames";
import { Dropdown } from "react-bootstrap";
import EllipsIcon from "@/public/ellipsIcon.svg";

const Table = ({
  theadData = [],
  tbodyData = [],
  children,
  width,
  theadText,
  closeDrawHandler,
  modalShowHandler,
}) => {
  const router = useRouter();

  const style = {
    width,
  };
  return (
    <table className='table' style={style}>
      <thead className={classNames({ "text-left": theadText })}>
        <tr>
          {theadData.map((item, i) => (
            <th key={i}>{item}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tbodyData.map((item, i) => {
          const hours = parseInt(item.timeOpened.substring(0, 2));
          return (
            <tr
              key={item._id}
              // onClick={() => router.push("/admin/transaction")}
            >
              <td>{item.drawDate}</td>
              <td>{item.drawTime}</td>
              <td>{item.timeOpened}</td>
              <td>{item.status}</td>
              <td>{item.collectedBets}</td>
              <td>{item.winningNumber}</td>
              <td style={{ cursor: "pointer" }}>
                <Dropdown>
                  <Dropdown.Toggle id='dropdown-basic'>...</Dropdown.Toggle>
                  <Dropdown.Menu style={{ marginRight: "1rem" }}>
                    {item.status !== "closed" && (
                      <Dropdown.Item
                        eventKey='1'
                        onClick={() => closeDrawHandler(item._id)}
                      >
                        Close Draw
                      </Dropdown.Item>
                    )}
                    {item.winningNumber === "" && (
                      <Dropdown.Item
                        eventKey='2'
                        onClick={() => modalShowHandler(item._id)}
                      >
                        Declare Winning Number
                      </Dropdown.Item>
                    )}

                    <Dropdown.Item
                      onClick={() =>
                        router.push(`/admin/collection/${item._id}`)
                      }
                      eventKey='3'
                    >
                      View Collections
                    </Dropdown.Item>
                    <Dropdown.Item
                      eventKey='4'
                      onClick={() => router.push(`/admin/winnings/${item._id}`)}
                    >
                      View Winnings
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </td>
            </tr>
          );
        })}
        {children && children}
      </tbody>
    </table>
  );
};

export default Table;
