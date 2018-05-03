const path=require('path');
const http=require('http');
const express=require('express');
const socketIO=require('socket.io');

const {generateMessage,generateLocationMessage}=require('./utils/message');

const port=process.env.PORT || 3000;
const publicPath=path.join(__dirname ,'../public');

const app=express();
const server=http.createServer(app);
const io=socketIO(server);


app.use(express.static(publicPath));
io.on('connection',(socket)=>{
    console.log('New user connected');
    socket.emit('newMessage',generateMessage('Admin','Welcome to the chat app'));
    socket.broadcast.emit('newMessage',generateMessage('Admin','New User Joined'));
    socket.on('disconnect',()=>{
        console.log('Client disconnected from server');
    });
 
   
    socket.on('createMessage',(message,callback)=>{
        console.log('New Message: ' + JSON.stringify(message,undefined,2));
        io.emit('newMessage',generateMessage(message.from, message.text));
        callback();
    });
    socket.on('createLocationMessage',(coords)=>{
        io.emit('newLocationMessage',generateLocationMessage('admin',coords.latitude, coords.longitude));
    });
});

server.listen(port,()=>{
    console.log(`Server is up on port ${port}`);
});

