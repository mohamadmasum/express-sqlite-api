import express from "express";
import dotenv from "dotenv";
import router from "./routes/route";

if (process.env.NODE_ENV == "production") {
  dotenv.config();
}

const app = express();
app.use(express.json());
app.use(router)

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server running di http://localhost:${port}`);
});
