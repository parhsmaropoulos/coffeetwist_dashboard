export const options = {
  ShopTitle: "COFFEE TWIST",
  ShopSubTitle: "Ελληνικό, Αθήνα",
};

export const current_url =
  process.env.ENV === "production"
    ? "https://ec2-54-170-72-108.eu-west-1.compute.amazonaws.com"
    : "http://localhost:8080/";
export const run_on =
  process.env.ENV === "production" ? "" : "http://localhost:3000";
