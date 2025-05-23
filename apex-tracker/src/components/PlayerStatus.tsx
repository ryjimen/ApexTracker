 // These are the react hooks
import { Card } from "react-bootstrap";

function PlayerStatus({ state }: { state: any }) {
  return (
    <>
      <Card
        className="shadow-lg"
        style={{
          border: "100%",
        }}
      >
        {state}
      </Card>
    </>
  );
}

export default PlayerStatus;
