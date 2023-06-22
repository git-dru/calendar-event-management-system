const http = require('http');
const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config()

const connectDB = require('./config/db')
const apiRoutes = require('./routes');

const app = express();

app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());

app.use('/', cors(), apiRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Event Mangement API!" });
});

const server = http.createServer(app);

const PORT = process.env.PORT || 8000;
server.listen(PORT);

server.on('listening', () => {
  console.log(`Server is Listening on PORT ${PORT}`);
  connectDB().then(res => console.log("Successfully connnected to MongoDB")).catch(console.log);

});

module.exports = app;