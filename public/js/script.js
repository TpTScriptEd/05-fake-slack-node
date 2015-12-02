var host = '';
var sendRoute = host + '/send';
var messagesRoute = host + '/messages';

function sendMessage (user, content, callback) {
  $.post(sendRoute, {user: user, content: content})
  .fail(function(data){;
  alert(data.responseText);
  })
  .done(callback);
}

function getMessages (callback) {
  $.get(messagesRoute)
  .done(callback);
}


$('#submit-message').submit(function (e) {
  e.preventDefault();

  var username = $('#submit-user').val();
  var content = $('#submit-content').val();

  sendMessage(username, content);
});

function formatMessage(message) {
  var timeString = new Date(message.timestamp).toLocaleTimeString();
  return '<li><span class="timestamp">' + timeString + '</span> ' + '<span class="username">' + message.user + '</span>' + ': ' + message.content + '</li>';
}

/* use setInterval to periodically get new messages and update the list */
function updateMessages() {
  var getMessagesCallback = function (messages) {
    // empty message log
    $('.messages').empty();

    for (var i = 0; i < messages.length; i++) {
      var message = messages[i];
      $('.messages').append(formatMessage(message));
    }
  };

  getMessages(getMessagesCallback);
}
window.setInterval(updateMessages, 250);
