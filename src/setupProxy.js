const proxy = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(
    "/api",
    proxy.createProxyMiddleware({
      target:
        process.env.REACT_APP_ENV === "dev"
          ? "http://localhost:8080"
          : "https://api.ct-dashboard.gr",
      ws: true,
    })
  );
};
