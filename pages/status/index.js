import { useState, useEffect } from "react";

export default function Status() {
  const [statusData, setStatusData] = useState(null);

  useEffect(() => {
    const fetchStatusData = async () => {
      const response = await fetch("/status");
      const responseBody = await response.json();
      setStatusData(responseBody.dependencies.database);
    };

    fetchStatusData();
  }, []);

  return (
    <div>
      <h1>Status</h1>
      {statusData ? (
        <div>
          <p>Database version: {statusData.version}</p>
          <p>Max connections: {statusData.max_connections}</p>
          <p>Current connections: {statusData.current_connections}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
