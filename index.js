const express = require("express")
const app = express();
const cors = require("cors")

const connectDB = require("./db/connectDB")

const { MONGODB_URI, PORT } = require("./config/server.config")

const authRoutes = require("./routes/auth.routes")

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", authRoutes);

app.listen(PORT, () => {
    console.log(`server running : ${PORT}`);
    connectDB(MONGODB_URI);
});