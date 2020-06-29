var socket = io(window.location.href);

function renderMessage(message) {
    $('.messages')
        .append(`
            <div class="message" <strong>${message.author}</strong>:  ${message.message}<div>
        `);
}

socket.on('previousMessages', function(messages) {
    for(message of messages) {
        renderMessage(message);
    }
});

socket.on('receivedMessage', function(message) {
    renderMessage(message);
});

socket.on('clearAll', function() {
    $('.messages .message').remove();
});

$('#chat').submit(function (e) {
    e.preventDefault();

    var author = $('input[name=username]').val();
    var message = $('input[name=message]').val();

    if(author.length && message.length) {
        $('input[name=message]').val('');
        var messageObject = {
            author: author,
            message: message
        };
    }

    renderMessage(messageObject);

    socket.emit('sendMessage', messageObject);
});