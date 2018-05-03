const socket=io();

socket.on('connect',function(){
    console.log('Connected to server');
});

socket.on('newMessage',function(message){
    console.log('New Message: ' + JSON.stringify(message, undefined,2));
    const li=jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    jQuery('#messages').append(li);
});

socket.on('disconnect',function(){
    console.log('Disconnected from server');
});

jQuery('#message-form').on('submit',function(e){
    e.preventDefault();
    socket.emit('createMessage',{
        from:'user',
        text:jQuery('[name=message]').val()
    },function(){
       
    });
});

