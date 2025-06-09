export default DarkMode;

import { useState, useEffect } from "react"; // These are the react hooks
import { ListGroupItem } from "react-bootstrap";
import Form from 'react-bootstrap/Form';

function DarkMode() {
    const [label, setLabel] = useState("☼");
    const setDarkMode = () => {
        document.querySelector("body").setAttribute("data-theme", "dark");
        setLabel("࣪ ִֶָ☾.")

    }

    const setLightMode = () => {
        document.querySelector("body").setAttribute("data-theme", "light");
        setLabel("☀︎");
    }

    return (
     <Form>
      <Form.Check // prettier-ignore
        type="switch"
        id="custom-switch"
        label={label}
        onChange={(e) => {
            if (e.target.checked) {
                setDarkMode();
            } else {
                setLightMode();
            }
        }}
      />
    </Form>
    )
}