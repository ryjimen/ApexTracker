//Simple component to test API 

import { useState, useEffect } from 'react' // These are the react hooks

const URL = 
"https://api.mozambiquehe.re/bridge?auth=4853042b9d8dbb2093e5cb391c638388&player=va1encia&platform=PC"

function Connect() {

  useEffect(() => {
    const fetchData = async () => {
        const result = await fetch(URL)
        result.json().then(json => {
            console.log(json);
        })
    }
    fetchData();
  }, [])

  return (
    <div>Hello World</div>
  )
}

export default Connect