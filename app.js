const express = require("express")
const cors = require('cors')
const { router } = require("./routes/allRoutes");
require("dotenv").config();


const app = express()
app.use(cors())
app.use(express.json())

app.use("/code-doctor", router)

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});