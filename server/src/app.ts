import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import logger from "morgan";
import { db } from "./config";


dotenv.config();
const { PORT } = process.env;

const app = express();
app.use(express.json());
app.use(logger("dev"));
app.use(cors());


app.get("/", (req, res) => {
  return res.send("Hello World!");
});

// (async () => {
//     try {
//       await db.authenticate();
//       console.log('Connection has been established successfully.');
//     } catch (error) {
//       console.error('Unable to connect to the database:', error);
//     } finally {
//       await db.close();
//     }
//   })();

// db.sync({force:true})
//   .then(() => {
//     console.log("Database is connected");
//   })
//   .catch((err: HttpError) => {
//     console.log(err);
//   });

// {force:true}

db.authenticate()
  .then(() => {
    console.log("Database connected...");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.error("Unable to connect to the database:", err));

process.on("SIGINT", async () => {
  await db.close();
  console.log("Database connection closed.");
  process.exit(0);
});

// db.sync({ force: true }); 
// This will drop and recreate all tables


// const port = PORT;

// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });

export default app;
