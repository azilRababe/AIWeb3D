import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import path from "path";

import dalleRoutes from "./routes/dalle.routes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limig: "50mb" }));

app.use("/api/v1/dalle", dalleRoutes);

// Serve static files from the 'build' folder
app.use(express.static(path.join(__dirname, "build")));

// Serve your React app on all routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
