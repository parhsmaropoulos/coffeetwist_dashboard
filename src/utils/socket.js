let wsConnection = () => {
  const socket = new WebSocket(
    `${
      process.env.REACT_APP_ENV === "dev"
        ? "ws://localhost:8080"
        : "wss://api.ct-dashboard.gr"
    }/ws/admin`
  );

  console.log("Attempting Connection...");
  sessionStorage.setItem("wsConnectionValid", true);

  socket.onopen = () => {
    console.log("Successfully Connected");
  };

  socket.onclose = (event) => {
    console.log("Socket Closed Connection: ", event);
    sessionStorage.setItem("wsConnectionValid", false);
  };

  socket.onerror = (error) => {
    console.log("Socket Error: ", error);
  };
  return socket;
};

let sendMsg = (msg, socket) => {
  socket.send(msg);
};

export { sendMsg, wsConnection };
