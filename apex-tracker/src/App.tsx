import { useState, useEffect } from "react"; // These are the react hooks
import "./App.css";

import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

import PlayerInfo from "./components/PlayerInfo";
import Header from "./components/Header";

function App() {
  // Keeps trask of input and dropdown information
  const [inputUsername, setInputUsername] = useState("");
  const [inputPlatform, setInputPlatform] = useState("");

  // Error when adding info card
  const [error, setError] = useState(false);
  const [errorName, setErrorName] = useState("");

  // The player cards to be rendered
  // An array of user, platform
  const [players, setPlayers] = useState<{ user: string; platform: string }[]>(
    []
  );

  // Adds a new player to the player list
  const handlePlayerAdd = () => {
    if (!inputUsername || !inputPlatform || inputPlatform === "---") return;

    // Appends new player to the end of the player list
    setPlayers((prev) => [
      ...prev,
      { user: inputUsername, platform: inputPlatform },
    ]);

    // Reset inputs
    setInputUsername("");
    setInputPlatform("---");
  };

  // remove a player by player Name via filter
  const removePlayer = (targetName: string) => {
    setPlayers((prev) =>
      // .filter works by returning elements of the array that match the condition
      prev.filter((player) => player.user !== targetName)
    );
  };

  const showError = (user: string) => {
    console.log("error in app");
    setError(true);
    setErrorName(user);

    setTimeout(() => {
      setError(false);
      setErrorName("");
    }, 3000);
  };

  return (
    <>
      <Header />
      <Card
        className="d-flex flex-row shadow-lg"
        style={{
          flexWrap: "wrap",
          marginLeft: "3rem",
          marginRight: "3rem",
          marginTop: "1rem",
          gap: "1rem",
          justifyContent: "center",
        }}
      >
        <div>
          <Form.Label htmlFor="inputUsername">Username</Form.Label>
          <Form.Control
            id="inputUsername"
            aria-describedby="inputUserHelp"
            size="sm"
            style={{
              width: "10rem",
              marginRight: "3rem",
            }}
            onChange={(e) => setInputUsername(e.target.value)}
            value={inputUsername}
          />
          <Form.Text id="inputUserHelp" muted>
            Player username as it appears
          </Form.Text>
        </div>
        <div>
          <Form.Label htmlFor="platSelect">Platform</Form.Label>
          <Form.Select
            id="platSelect"
            aria-label="Default select example"
            aria-describedby="platSelectHelp"
            size="sm"
            style={{
              width: "10rem",
              marginRight: "3rem",
            }}
            value={inputPlatform}
            onChange={(e) => setInputPlatform(e.target.value)}
          >
            <option value="---">---</option>
            <option value="PC">PC</option>
            <option value="PS4">Playstation</option>
            <option value="X1">Xbox</option>
          </Form.Select>
          <Form.Text id="platSelectHelp" muted>
            User Platform
          </Form.Text>
        </div>
        <div className="d-flex align-items-center">
          <Button  variant="danger" onClick={handlePlayerAdd} id="addPlayerBtn">
            +
          </Button>
        </div>
      </Card>
      <Card
        style={{
          border: "100%",
          margin: "3rem",
          backgroundColor: "white",
          borderRadius: "8",
        }}
        className="shadow-lg"
      >
        <div
          style={{
            marginTop: "1rem",
            color: "red",
            height: "1.5rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            visibility: error ? "visible" : "hidden", // toggle visibility
          }}
        >
          <Alert
            variant="danger"
            style={{
              marginTop: "1.1rem",
              height: "1rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {`Could Not Find: ${errorName}`}
          </Alert>
        </div>
        <div
          className="d-flex flex-row"
          style={{
            flexWrap: "wrap",
            marginLeft: "3rem",
            marginRight: "3rem",
            marginTop: "1rem",
            marginBottom: "4rem",
            gap: "1rem",
            justifyContent: "center",
          }}
        >
          {players.map((player, index) => (
            <PlayerInfo
              key={index}
              user={player.user}
              platform={player.platform}
              onRemove={() => removePlayer(player.user)}
              onError={() => showError(player.user)}
            />
          ))}
        </div>
      </Card>
    </>
  );
}

export default App;
