import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import morgan from "morgan";

import * as url from "url";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

// modules
import connect from "./database.js";
import AuthRoute from "./routes/authentication.js";
import FostersRoute from "./routes/fosterCenter.js";
import CagesRoute from "./routes/cages.js";
import UsersRoute from "./routes/users.js";
import PetCategoryRoute from "./routes/petCategory.js";
import PetRoute from "./routes/pet.js";
import AdoptionRoute from "./routes/adoption.js";

const app = express();
dotenv.config();

// middlewares
// app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/public", express.static(path.join(__dirname, "public")));

// foster api
app.use("/auth", AuthRoute);
app.use("/fostercenter", FostersRoute);
app.use("/cages", CagesRoute);
app.use("/users", UsersRoute);

// adoption api
app.use("/petcategory", PetCategoryRoute);
app.use("/pet", PetRoute);
app.use("/adoption", AdoptionRoute);

// error handling middleware
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "something went wrong";

  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

// connection status
const port = process.env.PORT || 8000;
app.listen(port, async () => {
  await connect();
  console.log(`server is running on ${port}`);
});
