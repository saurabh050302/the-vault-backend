const express = require("express")
const app = express();
const cors = require("cors")

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const authRoutes = require("./routes/auth.route")
const uploadImageRoute = require("./routes/uploadImage.route")

app.use("/api", authRoutes);
app.use("/api", uploadImageRoute);

const connectDB = require("./db/connectDB")
const { MONGODB_URI, PORT } = require("./config/server.config")

app.listen(PORT, () => {
    console.log(`server running : ${PORT}`);
    connectDB(MONGODB_URI);
});