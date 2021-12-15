export const headers = {
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json",
};
export const config = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    Authorization: `Bearer  ${process.env.REACT_APP_TOKEN}`,
  },
};
