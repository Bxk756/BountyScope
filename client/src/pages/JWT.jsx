import React, { useState } from "react";

export default function JWT() {

  const [token, setToken] = useState("");
  const [decoded, setDecoded] = useState("");

  function decodeToken() {

    try {

      const parts = token.split(".");

      const header = JSON.parse(atob(parts[0]));
      const payload = JSON.parse(atob(parts[1]));

      const output = {
        header,
        payload
      };

      setDecoded(JSON.stringify(output, null, 2));

    } catch (err) {
      setDecoded("Invalid JWT");
    }

  }

  return (

    <div className="panel">

      <h2>JWT Inspector</h2>

      <textarea
        placeholder="Paste JWT token here..."
        value={token}
        onChange={(e)=>setToken(e.target.value)}
      />

      <button onClick={decodeToken}>
        Decode Token
      </button>

      {decoded && (
        <pre className="reportBox">
          {decoded}
        </pre>
      )}

    </div>

  );

}
