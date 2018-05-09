const socket=io();

socket.on('connect',function(){
    console.log('Connected to server');
});

socket.on('newMessage',function(message){
    const formattedTime=moment(message.createdAt).format('h:mm a');
    const li=jQuery('<li></li>');
    li.text(`${message.from} ${formattedTime}: ${message.text}`);

    jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function(message){
    const li=jQuery('<li></li>');
    const locationSendTime=moment(message.createdAt).format('h:mm a');
    const a=jQuery('<a target="_blank">My current location</a>');
    li.text(`${message.from}: ${locationSendTime} `);
    a.attr('href',message.url);
    li.append(a);
    jQuery('#messages').append(li);
});
socket.on('disconnect',function(){
    console.log('Disconnected from server');
});

jQuery('#message-form').on('submit',function(e){
    e.preventDefault();
    const messageTextBox=jQuery('[name=message]');
    socket.emit('createMessage',{
        from:'user',
        text:messageTextBox.val()
    },function(){
        messageTextBox.val('');
    });
});
const locationBtn=jQuery('#send-location');
jQuery("#send-location").on('click',function(){
    if(!navigator.geolocation){
        return alert('Geolocation not supported by your browser');
    }
    locationBtn.attr('disabled','disabled').text('Sending location...');
    navigator.geolocation.getCurrentPosition(function(position){
        locationBtn.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage',{
            latitude:position.coords.latitude,
            longitude:position.coords.longitude
        });
    }, function(err){
        locationBtn.remove.attr('disabled').text('Send location');
        alert('Unable to fetch location');
    });
});

