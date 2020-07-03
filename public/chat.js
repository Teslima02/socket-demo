// Make connection
// var socket = io.connect('https://api.waya-ng.com', {query: {access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWYzMzI4MjVhYzVmMTA4MDNhNmQ5Y2YiLCJpYXQiOjE1OTMwOTQwMjZ9.8TWTTuagWPinCIWVXxfv_5YXk3eTwsCNpZp7kKqSvqU"}});
var socket = io.connect('http://apises.waya-ng.com', {query: {access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWYyMjcwYjYzMzA2OTBmZGEyNjMxOWYiLCJpYXQiOjE1OTMwOTQxOTZ9.XsxAK5lmuIiccSI5KPGmaBJ1_tWZ6wf8kdR74u7D-to"}});
// var socket = io.connect('http://3.21.186.123', {query: {access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWYyMjcwYjYzMzA2OTBmZGEyNjMxOWYiLCJpYXQiOjE1OTMwOTQxOTZ9.XsxAK5lmuIiccSI5KPGmaBJ1_tWZ6wf8kdR74u7D-to"}});
// var socket = io.connect('http://api.waya-ng.com', {query: {access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWY5OTJjZGViYzVlYjEwNjBkZDY5MTgiLCJpYXQiOjE1OTM3NzgwNDZ9.2d-w_lSkfKX5sukIgQkEypzvrWg0r3mRZOIU06IgdqM"}});

// Query DOM
var message = document.getElementById('message'),
      handle = document.getElementById('handle'),
      btn = document.getElementById('send'),
      output = document.getElementById('output'),
      feedback = document.getElementById('feedback');


var message1 = {
        _id: '5ef2270b6330690fda26319f',
        userId2: '5ef07e086330690fda26318f',
        message: 'Hello Good morning',
        messageQuote: '',
        forwardMessage: false,
    }

    var deleteMessage = {
        messageId: '5ef269436330690fda2631b6',
        userId1: '5ef2270b6330690fda26319f',
        userId2: '5ef07e086330690fda26318f',
        chatId: '5ef07e086330690fda26318f5ef2270b6330690fda26319f',
    }

// Emit events
btn.addEventListener('click', function(){
    // post message
    // socket.emit('/api/chat/post',message1);

    // delete message
    socket.emit('/api/chat/delete',deleteMessage);
});

message.addEventListener('keypress', function(){
    socket.emit('typing', handle.value);
})

socket.on('/api/chat/post', function(data){
    console.log(data, 'data');
});

socket.on('/api/chat', function(data){
    console.log(data, 'data');
});

// get deleted message
socket.on('/api/chat/delete', function(data){
    console.log(data, 'data')
});

// Listen for events
socket.on('chat', function(data){
    feedback.innerHTML = '';
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});

socket.on('typing', function(data){
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});
