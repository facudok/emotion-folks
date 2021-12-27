//@ts-check
const express = require("express");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })
);

app.use(express.static(__dirname + "/Routes"));

/** Swagger Initialization - START */
const swaggerOption = {
  // @ts-ignore
  swaggerDefinition: (swaggerJsdoc.Options = {
    info: {
      title: "my-posts",
      description: "API documentation",
      contact: {
        name: "Developer",
      },
      servers: ["http://localhost:3000/"],
    },
  }),
  apis: ["index.js", "./routes/*.js"],
};

// @ts-ignore
const swaggerDocs = swaggerJsdoc(swaggerOption);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
/** Swagger Initialization - END */

app.listen(3000, () => {
  console.log("I am ready to listen you");
});
