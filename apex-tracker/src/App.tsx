import { useState, useEffect } from "react"; // These are the react hooks
import "./App.css";

import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import PlayerInfo from "./components/PlayerInfo";
import Header from "./components/Header";

function App() {
  const [inputUsername, setInputUsername] = useState("");
  const [inputPlatform, setInputPlatform] = useState("");
  const [players, setPlayers] = useState<{ user: string; platform: string }[]>(
    []
  );

  const handlePlayerAdd = () => {
    if (!inputUsername || !inputPlatform || inputPlatform === "---") return;

    setPlayers((prev) => [
      ...prev,
      { user: inputUsername, platform: inputPlatform },
    ]);

    // Clear inputs
    setInputUsername("");
    setInputPlatform("---");
  };

  const removePlayer = (targetName: string) => {
    setPlayers((prev) => 
      prev.filter((player) => player.user !== targetName)
    );
  }


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
          <Button variant="danger" onClick={handlePlayerAdd}>
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
          className="d-flex flex-row"
          style={{
            flexWrap: "wrap",
            marginLeft: "3rem",
            marginRight: "3rem",
            marginTop: "1rem",
            marginBottom: "1rem",
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
            />
          ))}
        </div>
      </Card>
    </>
  );
}

export default App;
