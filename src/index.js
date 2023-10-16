import express from "express";
import dotenv from "dotenv";
import configViewEngine from "./config/viewEngine";
import initWebRoute from "./route/webRoute";
import initApiRoute from "./route/webApiRoute"
import path from "path";
import bodyParser from "body-parser";
import session from "express-session";
import RedisStore from "connect-redis";
import { createClient } from "redis";
// const express = require('express')
const app = express();
dotenv.config();
configViewEngine(app);
const port = process.env.PORT;
// initialize client
let redisClient = createClient();
redisClient.connect().catch(console.error);
// initialize store
let redisStore = new RedisStore({
  client: redisClient,
  prefix: "myapp:",
});
// Initialize sesssion storage.
app.use(
  session({
    store: redisStore,
    resave: false, // required: force lightweight session keep alive (touch)
    saveUninitialized: false, // recommended: only save session when data
    secret: "keyboard cat",
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  "/bootstrap/css",
  express.static(path.join(__dirname, "./../node_modules/bootstrap/dist/css"))
);
app.use(
  "/bootstrap/js",
  express.static(path.join(__dirname, "./../node_modules/bootstrap/dist/js"))
);
initApiRoute(app)
initWebRoute(app);
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
