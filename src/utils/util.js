export const options = {
  ShopTitle: "COFFEE TWIST",
  ShopSubTitle: "Ελληνικό, Αθήνα",
};

export const live_url = "";
export const local_url = "http://localhost:8080/";

export const current_url =
  process.env.ENV === "production" ? "" : "http://localhost:8080/";
export const run_on =
  process.env.ENV === "production" ? "" : "http://localhost:3000";
