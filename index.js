const express = require("express");
const getRoutes = require("./routes/routes");
const { connectToDb } = require("./db/connect")
require('dotenv').config();
const app = express();
const cors = require("cors")
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json())
app.use(express.static('public'));
app.use("/", getRoutes);
connectToDb((err) => {
    if (err) {
        console.error('Failed to connect to the database');
        process.exit(1);
    } else {
        console.log('Database connected successfully');
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }
});