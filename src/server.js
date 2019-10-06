const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const socketio = require('socket.io')
const http = require('http');

console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const app = express();
const server = http.Server(app);
const io = socketio(server);

console.log(process.env.MONGO_URL)

mongoose.connect(process.env.MONGO_URL,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

let connectedUsers = {};
 io.on('connection', socket =>{

   const {user_id} = socket.handshake.query;
   console.log(connectedUsers);
   if(connectedUsers[user_id] !== socket.id){
      connectedUsers[user_id]= socket.id;
   }
  
   //console.log(connectedUsers);
  //  socket.emit('message','world');

  //  socket.on('omni', data => {
  //    console.log(data)
  //  })
 });
// adiconar variveis io e connctedUsers para todas as rotas da aplicao
 app.use((req,res, next) =>{
   req.io = io;
   req.connectedUsers = connectedUsers;
   return next(); // continua o fluxo normal da aplicaçao
 }) ;

app.use(express.json());
app.use(cors());
app.use('/files', express.static(path.resolve(__dirname,'..','uploads')))
app.use(routes);

server.listen(process.env.PORT || 3333);