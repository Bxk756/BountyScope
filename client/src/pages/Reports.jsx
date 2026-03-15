import { useState } from "react";

export default function Reports() {

  const [title,setTitle] = useState("");
  const [endpoint,setEndpoint] = useState("");
  const [payload,setPayload] = useState("");
  const [severity,setSeverity] = useState("Medium");

  const [report,setReport] = useState("");

  function generateReport(){

    const output = `
Title: ${title}

Endpoint:
${endpoint}

Severity:
${severity}

Payload:
${payload}

Impact:
This vulnerability may allow attackers to manipulate application behavior or redirect users.

Recommendation:
Validate user input and sanitize parameters.
`;

    setReport(output);

  }

  return(

    <div className="panel">

      <h2>Bug Bounty Report Generator</h2>

      <input
      placeholder="Vulnerability Title"
      value={title}
      onChange={(e)=>setTitle(e.target.value)}
      />

      <input
      placeholder="Affected Endpoint"
      value={endpoint}
      onChange={(e)=>setEndpoint(e.target.value)}
      />

      <input
      placeholder="Payload Used"
      value={payload}
      onChange={(e)=>setPayload(e.target.value)}
      />

      <select
      value={severity}
      onChange={(e)=>setSeverity(e.target.value)}
      >
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
        <option>Critical</option>
      </select>

      <button onClick={generateReport}>
        Generate Report
      </button>

      {report &&(
        <pre className="reportBox">
          {report}
        </pre>
      )}

    </div>

  );

}
