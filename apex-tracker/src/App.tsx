import { useState, useEffect } from "react"; // These are the react hooks
import "./App.css";
import PlayerInfo from "./components/PlayerInfo";
import Header from "./components/Header";
import Card from "react-bootstrap/Card";

function App() {
  return (
    <>
      <head>
        <style>
          @import
          url('https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap');
        </style>
      </head>
      <Header />
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
            marginLeft: "3rem",
            marginRight: "3rem",
            marginTop: "1rem",
            marginBottom: "1rem",
          }}
        >
          <PlayerInfo />
        </div>
      </Card>
    </>
  );
}

export default App;
