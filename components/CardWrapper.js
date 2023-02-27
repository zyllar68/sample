import { Card } from "@/components";

const CardWrapper = ({ children }) => {
  return (
    <div className='CardWrapper'>
      <div style={{ display: "flex", gap: "1rem" }}>
        <Card primary />
        <Card peach />
      </div>
      {children}
    </div>
  );
};

export default CardWrapper;
