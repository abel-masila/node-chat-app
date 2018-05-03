const path=require('path');
const http=require('http');
const express=require('express');
const socketIO=require('socket.io');


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
 
   
    socket.on('createMessage',(message)=>{
        console.log('New Message: ' + JSON.stringify(message,undefined,2));
        io.emit('newMessage',{
            from:message.from,
            text:message.text,
            createdAt:new Date().getTime()
        });
    });
    
});

server.listen(port,()=>{
    console.log(`Server is up on port ${port}`);
});

