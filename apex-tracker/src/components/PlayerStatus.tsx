import { useState, useEffect } from "react"; // These are the react hooks
import { Card, ListGroupItem } from "react-bootstrap";


function PlayerStatus({state}:{state:any}) {
    console.log(state)
    return (
        <>
        <Card>
            {state}
        </Card>
        </>
    )
}

export default PlayerStatus