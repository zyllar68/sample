import { useRouter } from "next/router";

const Table = ({ theadData = [], tbodyData = [], children, onClick }) => {
  const router = useRouter();
  return (
    <table className='table'>
      <thead>
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
