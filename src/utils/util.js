export const options = {
  ShopTitle: "COFFEE TWIST",
  ShopSubTitle: "Ελληνικό, Αθήνα",
};

export const current_url =
  "https://ct-lb-1094286185.eu-west-1.elb.amazonaws.com/";

export const run_on =
  process.env.ENV === "production" ? "" : "http://localhost:3000";
