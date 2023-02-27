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
        {tbodyData.map((array, i) => (
          <tr key={i} onClick={() => router.push("/admin/transaction")}>
            {array.map((item, i) => (
              <td key={i}>{item}</td>
            ))}
          </tr>
        ))}
        {children && children}
      </tbody>
    </table>
  );
};

export default Table;
