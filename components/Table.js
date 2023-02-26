const Table = ({ theadData = [], tbodyData = [] }) => {
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
          <tr key={i}>
            {array.map((item, i) => (
              <td key={i}>{item}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
