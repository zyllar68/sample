const Table = ({ children, theadData = [], tbodyData = [] }) => {
  return (
    <table>
      <thead>
        <tr>
          {theadData.map((item, i) => (
            <th key={i}>{item}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tbodyData.map((item, i) => (
          <tr key={i}>
            <td>yeah</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
