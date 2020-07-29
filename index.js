const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

//import routes
const note = require("./routes/note");
const noteRouter = require("./routes/note");
app.use("/note", noteRouter);

//Check either the env.mongodb or use the link which was copied in mongodb website
const uri = process.env.mongodb || process.env.URI;

mongoose.connect(
  uri,
  {
    useNewUrlParser: true,
    useFindAndModify: false,
  },
  (err) => {
    if (err) {
      process.exit(1);
      console.log("Opus unable to connect to database");
    } else console.log("Yeahh successfully connected to the database");
  }
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

// To start the server, cmd: npm start
// Or cmd: npm run dev, this would start the server with nodemon
