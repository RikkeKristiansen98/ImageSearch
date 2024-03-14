const express = require ("express");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

app.get("/", (req, res) => 
res.send("Hello world")
);

app.listen(PORT, () => 
console.log(`Server is running on port ${PORT}`)
);