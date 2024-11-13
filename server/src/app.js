import express from "express";
import cors from "cors";
import routes from "../routes/routes.js";
import db from "../util/db-connect.js";

const app = express();
const PORT = 5005;

app.use(cors());
app.use(express.json());

app.use("/", routes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
