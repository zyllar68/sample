import { Form } from "react-bootstrap";

const DropdownComponent = ({ onChange, value }) => {
  return (
    <Form.Select size='lg' onChange={onChange} value={value}>
      <option value={1}>All</option>
      <option value={2}>2pm</option>
      <option value={5}>5pm</option>
      <option value={9}>9pm</option>
    </Form.Select>
  );
};

export default DropdownComponent;
