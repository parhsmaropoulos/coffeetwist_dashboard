const socket = new WebSocket(
  `${
    process.env.REACT_APP_ENV === "dev"
      ? "ws://localhost:8080"
      : "wss://api.ct-dashboard.gr"
  }/ws/admin`
);

console.log("Attempting Connection...");

socket.onopen = () => {
  console.log("Successfully Connected");
};

socket.onclose = (event) => {
  console.log("Socket Closed Connection: ", event);
  connect();
};

socket.onerror = (error) => {
  console.log("Socket Error: ", error);
};

let connect = () => {
  const socket = new WebSocket(
    `${
      process.env.REACT_APP_ENV === "dev"
        ? "ws://localhost:8080"
        : "wss://api.ct-dashboard.gr"
    }/ws/${sessionStorage.getItem("userID")}`
  );

  console.log("Attempting Connection...");

  socket.onopen = () => {
    console.log("Successfully Connected");
  };

  socket.onclose = (event) => {
    console.log("Socket Closed Connection: ", event);
    connect();
  };

  socket.onerror = (error) => {
    console.log("Socket Error: ", error);
  };
};

let sendMsg = (msg) => {
  //   console.log("sending msg: ", msg);
  socket.send(msg);
};

export { sendMsg, socket };
