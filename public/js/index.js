const socket=io();

socket.on('connect',function(){
    console.log('Connected to server');
    socket.emit('createMessage',{
        from:'Tony',
        text:"Test socket.io"
    });
});

socket.on('newMessage',function(message){
    console.log('New Message: ' + JSON.stringify(message, undefined,2));
});

socket.on('disconnect',function(){
    console.log('Disconnected from server');
});

