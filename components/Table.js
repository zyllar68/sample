import { useRouter } from "next/router";
import classNames from "classnames";
import Dropdown from "react-bootstrap/Dropdown";

const Table = ({
  theadData = [],
  tbodyData = [],
  children,
  width,
  theadText,
  closeDrawHandler,
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
              <td>
                {item.timeOpened} {hours < 12 ? "AM" : "PM"}
              </td>
              <td>{item.timeClosed}</td>
              <td>{item.collectedBets}</td>
              <td>{item.winningNumber}</td>
              <td style={{ cursor: "pointer" }}>
                <Dropdown>
                  <Dropdown.Toggle>...</Dropdown.Toggle>
                  <Dropdown.Menu style={{ marginRight: "1rem" }}>
                    <Dropdown.Item
                      eventKey='1'
                      onClick={() => closeDrawHandler(item._id)}
                    >
                      Close Draw
                    </Dropdown.Item>
                    <Dropdown.Item eventKey='2'>
                      Declare Winning Number
                    </Dropdown.Item>
                    <Dropdown.Item eventKey='3'>View Collections</Dropdown.Item>
                    <Dropdown.Item eventKey='4'>View Winnings</Dropdown.Item>
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
