const path=require('path');
const http=require('http');
const express=require('express');
const socketIO=require('socket.io');

const {generateMessage,generateLocationMessage}=require('./utils/message');
const {isRealString} =require('./utils/validation');

const port=process.env.PORT || 3000;
const publicPath=path.join(__dirname ,'../public');

const app=express();
const server=http.createServer(app);
const io=socketIO(server);


app.use(express.static(publicPath));
io.on('connection',(socket)=>{
    console.log('New user connected');
    socket.on('disconnect',()=>{
        console.log('Client disconnected from server');
    });
 
    socket.on('join',(params,callback)=>{
        if(!isRealString(params.name) || !isRealString(params.room)){
            callback('Name and Room name are required');
        }
        socket.join(params.room);
        //socket.leave(params.room);
        socket.emit('newMessage',generateMessage('Admin','Welcome to the chat app'));
        socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin',`${params.name} Has Joined`));

        callback();
    });
    socket.on('createMessage',(message,callback)=>{
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

