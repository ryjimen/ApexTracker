//Simple component to test API

import { useState, useEffect } from "react"; // These are the react hooks
import { ListGroupItem } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ProgressBar from "react-bootstrap/ProgressBar";
import Spinner from "react-bootstrap/Spinner";
import PlayerStatus from "./PlayerStatus";
import Button from "react-bootstrap/Button";

type PlayerInfoProps = {
  user: string;
  platform: string;
  onRemove: () => void;
  onError: () => void;
};

function PlayerInfo({ user, platform, onRemove, onError }: PlayerInfoProps) {
  const [playerData, setPlayerData] = useState(null);
  const [error, setError] = useState(false);

  const URL = `http://127.0.0.1:5000/player/${user}?platform=${platform}`;

  useEffect(() => {
    const fetchData = async () => {
      fetch(URL)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Bad get");
          }
        })
        .then((responseJson) => {
          setPlayerData(responseJson);
        })
        .catch((error) => {
          console.log(error);
          setError(true);
        });
    };
    fetchData();
  }, []);

  if (error) {
    onError();
    onRemove();
    return null;
  }

  // If Player data not loaded
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
  const rankRP = rankInfo["rankScore"];

  // Level information
  const level = parseInt(globalData["level"]) || 0;
  const prestige = parseInt(globalData["levelPrestige"]) || 0;
  const playerLvlActual = level + prestige * 500;
  const levelPercent = globalData["toNextLevelPercent"];

  const realTimeData = playerData["realtime"];

  const status = () => {
    if (parseInt(realTimeData["isOnline"]) == 1) {
      return parseInt(realTimeData["isInGame"]) == 1 ? "in-game" : "online";
    } else {
      return "Offline";
    }
  };
  const playerStatus = status();

  /*
   *
   */
  return (
    <>
      <Card style={{ width: "15rem" }} className="shadow-lg">
        <div style={{ position: "relative" }}>
          <Card.Img src={globalData["avatar"]} />
          <div
            style={{
              position: "absolute",
              top: "85%",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 2,
            }}
          >
            <PlayerStatus state={playerStatus} />
          </div>
          <div
            style={{
              position: "absolute",
              top: "5%",
              left: "5%",
              zIndex: 2,
            }}
          >
            <Button
              variant="danger"
              onClick={onRemove}
              style={{
                alignContent: "center",
              }}
            >
              -
            </Button>
          </div>
        </div>
        <Card.Body
          className="d-flex align-items-center"
          style={{ paddingTop: "0.5rem", paddingBottom: "0.2rem" }}
        >
          <Card.Title>{fullUser}</Card.Title>
          <Card.Text></Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush p ">
          <ListGroupItem>
            <Card.Body
              style={{ paddingTop: "0.1rem", paddingBottom: "0.3rem" }}
            >
              Level: {playerLvlActual}
              <ProgressBar now={levelPercent} label={`XP: ${levelPercent}%`} />
            </Card.Body>
          </ListGroupItem>
          <ListGroupItem>
            <Card.Body
              style={{ paddingTop: "0.1rem", paddingBottom: "0.3rem" }}
            >
              <img src={rankImg} style={{ width: "30%", height: "30%" }} />
              {rankInfo["rankName"] + " "}
              {rankInfo["rankDiv"]}
              <div className="d-flex justify-content-center">
                {"RP: " + rankRP}
              </div>
              <ProgressBar
                now={100 - rankPercent}
                label={`Top ${rankPercent}%`}
              />
            </Card.Body>
          </ListGroupItem>
        </ListGroup>
      </Card>
    </>
  );
}

//      <pre>{JSON.stringify(playerData, null, 3)}</pre>
export default PlayerInfo;
