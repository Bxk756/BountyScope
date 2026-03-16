import React, { useState } from "react";

export default function CVSS() {

  const [score, setScore] = useState(0);

  const [AV, setAV] = useState("N");
  const [AC, setAC] = useState("L");
  const [PR, setPR] = useState("N");
  const [UI, setUI] = useState("N");

  function calculateScore() {

    let value = 0;

    if (AV === "N") value += 3;
    if (AV === "A") value += 2;
    if (AV === "L") value += 1;

    if (AC === "L") value += 2;
    if (AC === "H") value += 1;

    if (PR === "N") value += 3;
    if (PR === "L") value += 2;

    if (UI === "N") value += 2;
    if (UI === "R") value += 1;

    setScore(value);
  }

  return (

    <div>

      <h2>CVSS Calculator</h2>

      <p>Attack Vector</p>

      <select value={AV} onChange={(e)=>setAV(e.target.value)}>
        <option value="N">Network</option>
        <option value="A">Adjacent</option>
        <option value="L">Local</option>
        <option value="P">Physical</option>
      </select>

      <p>Attack Complexity</p>

      <select value={AC} onChange={(e)=>setAC(e.target.value)}>
        <option value="L">Low</option>
        <option value="H">High</option>
      </select>

      <p>Privileges Required</p>

      <select value={PR} onChange={(e)=>setPR(e.target.value)}>
        <option value="N">None</option>
        <option value="L">Low</option>
        <option value="H">High</option>
      </select>

      <p>User Interaction</p>

      <select value={UI} onChange={(e)=>setUI(e.target.value)}>
        <option value="N">None</option>
        <option value="R">Required</option>
      </select>

      <br />
      <br />

      <button onClick={calculateScore}>
        Calculate
      </button>

      <h3>Score: {score}</h3>

    </div>

  );
}
