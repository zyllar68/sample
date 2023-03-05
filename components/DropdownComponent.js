import { Form } from "react-bootstrap";

const DropdownComponent = ({ onChange, selectedValue }) => {
  return (
    <Form.Select size='lg' onChange={onChange} value={selectedValue}>
      <option value='all'>All Draws</option>
      <option value={2}>2pm</option>
      <option value={5}>5pm</option>
      <option value={9}>9pm</option>
    </Form.Select>
  );
};

export default DropdownComponent;
