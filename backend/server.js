const express = require('express')
require("dotenv").config();
const cors = require('cors')

const connectDB = require("./config/db");
connectDB();
const ticketRoutes = require("./routes/ticketRoutes");
const app = express();
app.use(cors())
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "support CRMAPI is Running" })
})
app.use("/api", ticketRoutes);
const port = process.env.port || 5000;

app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`)
})