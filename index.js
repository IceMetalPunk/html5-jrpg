require('dotenv').config();
const express = require('express');
const server = express();
const PORT = process.env.PORT || 3000;
server.use(express.static('./public'));

server.listen(PORT, () => {
   console.log(`Listening on port ${PORT}...`); 
});