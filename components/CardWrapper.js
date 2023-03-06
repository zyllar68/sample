import { Card } from "@/components";

const CardWrapper = ({
  children,
  firstCardColor,
  secondCardColor,
  firstNumberTitle,
  secondNumberTitle,
  firstBottomTitle,
  secondBottomTitle,
}) => {
  return (
    <div className='CardWrapper'>
      <div style={{ display: "flex", gap: "1rem" }}>
        <Card
          bgColor={firstCardColor}
          numberTitle={firstNumberTitle}
          bottomTitle={firstBottomTitle}
        />
        <Card
          bgColor={secondCardColor}
          numberTitle={secondNumberTitle}
          bottomTitle={secondBottomTitle}
        />
      </div>
      {children}
    </div>
  );
};

export default CardWrapper;
