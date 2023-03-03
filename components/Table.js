import { useRouter } from "next/router";
import classNames from "classnames";

const Table = ({
  theadData = [],
  tbodyData = [],
  children,
  width,
  theadText,
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
              onClick={() => router.push("/admin/transaction")}
            >
              <td>{item.drawDate}</td>
              <td>{item.drawTime}</td>
              <td>
                {item.timeOpened} {hours < 12 ? "AM" : "PM"}
              </td>
              <td>{item.timeClosed}</td>
              <td>{item.collectedBets}</td>
              <td>{item.winningNumber}</td>
            </tr>
          );
        })}
        {children && children}
      </tbody>
    </table>
  );
};

export default Table;
