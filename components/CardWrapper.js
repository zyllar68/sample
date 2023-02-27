import { Card } from "@/components";

const CardWrapper = ({ children, firstCardColor, secondCardColor }) => {
  return (
    <div className='CardWrapper'>
      <div style={{ display: "flex", gap: "1rem" }}>
        <Card bgColor={firstCardColor} />
        <Card bgColor={secondCardColor} />
      </div>
      {children}
    </div>
  );
};

export default CardWrapper;
