//Simple component to test API

import { useState, useEffect } from "react"; // These are the react hooks
import { ListGroupItem } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ProgressBar from "react-bootstrap/ProgressBar";
import Spinner from "react-bootstrap/Spinner";
import PlayerStatus from "./PlayerStatus"

const URL = "http://127.0.0.1:5000/player/va1encia?platform=PC";

function PlayerInfo() {
  const [playerData, setPlayerData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(URL);
      result.json().then((json) => {
        setPlayerData(json);
        console.log(json);
      });
    };
    fetchData();
  }, []);

  if (!playerData) {
    return (
      <>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <div>{"Loading..."}</div>
      </>
    );
  }

  const globalData = playerData["global"];
  const tag = globalData["tag"];

  //Username info
  const userName = globalData["name"];
  const fullUser = tag ? `[${tag}]${userName}` : userName;

  //Rank info
  const rankInfo = globalData["rank"];
  const rankImg = rankInfo["rankImg"];
  const rankPercent = rankInfo["ALStopPercent"];

  const level = parseInt(globalData["level"]) || 0;
  const prestige = parseInt(globalData["levelPrestige"]) || 0;
  const playerLvlActual = level + prestige * 500;
  const levelPercent = globalData["toNextLevelPercent"];

  

  /*
   *
   */
  return (
    <div>
      <Card style={{ width: "15rem" }} className="shadow-lg">
        <div style={{ position: "relative" }}>
          <Card.Img src={globalData["avatar"]} />
          <div
            style={{
              position: "absolute",
              top: "85%",     
              right: "40%",   
              zIndex: 2
            }}
          >
            <PlayerStatus state={"offline"} />
          </div>
        </div>
        <Card.Body className="d-flex align-items-center ">
          <Card.Title
            style={{ paddingTop: "0.3rem", paddingBottom: "0.05rem" }}
          >
            {fullUser}
          </Card.Title>
          <Card.Text></Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush p">
          <ListGroupItem>
            <Card.Body
              style={{ paddingTop: "0.1rem", paddingBottom: "0.3rem" }}
            >
              <img src={rankImg} style={{ width: "30%", height: "30%" }} />
              {rankInfo["rankName"] + " "}
              {rankInfo["rankDiv"]}
              <ProgressBar
                now={100 - rankPercent}
                label={`Top ${rankPercent}%`}
              />
            </Card.Body>
          </ListGroupItem>
          <ListGroupItem>
            <Card.Body
              style={{ paddingTop: "0.1rem", paddingBottom: "0.3rem" }}
            >
              Level: {playerLvlActual}
              <ProgressBar now={levelPercent} label={`XP: ${levelPercent}%`} />
            </Card.Body>
          </ListGroupItem>
        </ListGroup>
      </Card>
    </div>
  );
}

//      <pre>{JSON.stringify(playerData, null, 3)}</pre>
export default PlayerInfo;
