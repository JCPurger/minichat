import '../css/style.scss';

import io from 'socket.io-client';

var socket = io(window.location.href);

const authorEl = document.querySelector('input[name=username]');
const messageEl = document.querySelector('input[name=message]');

function renderMessage(message) {
    document.querySelector('.messages')
        .insertAdjacentHTML('beforeend',`
            <div class="message" <strong>${message.author}</strong>:  ${message.message}<div>
        `);
}

socket.on('previousMessages', function(messages) {
    for(let message of messages) {
        renderMessage(message);''
    }
});

socket.on('receivedMessage', function(message) {
    renderMessage(message);
});

socket.on('clearAll', function() {
    $('.messages .message').remove();
});

document.querySelector('#chat').addEventListener("submit", function (e) {
    e.preventDefault();
    
    let author = authorEl.value;
    let message = messageEl.value;

    if(author.length && message.length) {
        var messageObject = {
            author: author,
            message: message
        };

        messageEl.value = '';
    }

    renderMessage(messageObject);

    socket.emit('sendMessage', messageObject);
});