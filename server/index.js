const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());


//Connecet to MongoDB
mongoose.connect(process.env.Mongo_URI,)
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

//Rouutes
const tasksRoutes = require("./routes/task");
app.use("/api/tasks",tasksRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));