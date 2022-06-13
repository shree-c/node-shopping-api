require('dotenv').config({
  path: './config/config.env'
});
//router require begin
const auth_router = require('./router/auth_router');
//router require end

const mongoose = require('mongoose');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;
let connect = null; //mongoose connection global variable
//using router middlewares
app.use('/api/v1/user', auth_router);

app.listen(PORT, async function () {
  try {
    connect = await mongoose.connect(process.env.CONNECTION_URI);
    console.log(`connected to ${connect.connection.host}
    listining at port : ${PORT}`);
  } catch (error) {
    console.log('error connecting db'.red, error);
    process.exit(1);
  }
});

process.on('SIGINT', async function () {
  console.log('stopping application...');
  await connect.connection.close();
  console.log('stopped.');
});