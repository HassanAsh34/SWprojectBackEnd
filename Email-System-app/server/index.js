const express = require("express");
const app = express();
app.use(express.json());
require("./connection/dbConnection"); // Database singleton pattern.
// const emailRouter = require("./routes/EmailRoute");
//  app.use("/", emailRouter);
const AdminRoutes = require("./routes/AdminRoutes");
const authRoutes = require("./routes/authRoutes");
const foldersRoutes =require("./routes/folderRoutes.js");
require('../server/controllers/mqttController').createClient()




app.use("/", AdminRoutes);

app.use("/", authRoutes);

app.use("/",foldersRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
