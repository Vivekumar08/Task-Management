const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const TaskRouter = require('./Router/task');
const UserRouter = require('./Router/user');

const app = express();

dotenv.config({ path: './config.env' })
require("./db/connection")

app.use(cors());
app.use(express.json());
app.set("view engine", "ejs")
app.use(bodyParser.urlencoded(
    { extended: true }
))

app.get("/", async (req, res) => {
    res.json("Congratulations!! Beackend server made successfully")
})
app.use("/user", UserRouter)
app.use("/task", TaskRouter)

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});