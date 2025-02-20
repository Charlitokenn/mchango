import {Card, Col, Row} from "antd";
import {Text} from "../text";
import CountUp from "react-countup";

type Props = {
  title: string;
  amount: number | string;
  description: string;
};

const DataCard = ({ title, amount, description }: Props) => {
  return (
    <Card
      size="small"
      styles={{
        header: { padding: "8px 16px" },
        body: { padding: "0 0.5rem" },
      }}
      title={
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "8px",
          }}
        >
          <Text size="sm" style={{ marginLeft: "0.5rem" }}>
            {title}
          </Text>
        </div>
      }
    >
        <Text size="lg" style={{ marginTop: "0.5rem", fontWeight: "bold" }}>
          <CountUp
            end={typeof amount === "number" ? amount : parseFloat(amount)}
            delay={0}
            prefix="Tshs. "
            duration={3}
          />
        </Text>
        <Row
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "0.7rem",
            width: "100%", // Ensure Row takes full width
          }}
        >
          {description}
        </Row>
    </Card>
  );
};

export default DataCard;
