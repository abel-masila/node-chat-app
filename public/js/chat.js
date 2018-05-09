const socket=io();

function scrollToBottom(){
    //selectors
    const messages=jQuery('#messages');
    const newMessage=messages.children('li:last-child');
    //heights
    const clientHeight=messages.prop('clientHeight');
    const scrollTop=messages.prop('scrollTop');
    const scrollHeight=messages.prop('scrollHeight');
    const newMessageHeight=newMessage.innerHeight();
    const lastMessageHeight=newMessage.prev().innerHeight();

    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
        messages.scrollTop(scrollHeight);
    }
}

socket.on('connect',function(){
    const params=jQuery.deparam(window.location.search);

    socket.emit('join',params,function(err){
        if(err){
            alert(err);
            window.location.href='/';
        }else{
            console.log('No error!');
        }
    });
});

socket.on('newMessage',function(message){
    const formattedTime=moment(message.createdAt).format('h:mm a');
    const template=jQuery('#message-template').html();
    const html=Mustache.render(template,{
        text:message.text,
        from: message.from,
        createdAt: formattedTime
    });
    jQuery('#messages').append(html);
    scrollToBottom();
});

socket.on('newLocationMessage', function(message){
    const locationSendTime=moment(message.createdAt).format('h:mm a');
    const template=jQuery('#location-message-template').html();
    const html=Mustache.render(template,{
        from:message.from,
        url:message.url,
        createdAt:locationSendTime
    });
    jQuery('#messages').append(html);
    scrollToBottom();
});
socket.on('disconnect',function(){
    console.log('Disconnected from server');
});

socket.on('updateUserList',function(users){
   const ol=jQuery('<ol></ol>');
   users.forEach(function(user){
    ol.append(jQuery('<li></li>').text(user));
   });
   jQuery('#users').html(ol);
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

