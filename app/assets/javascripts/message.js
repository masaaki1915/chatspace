$(function() {
  function buildHTML(message) {
    var userName = $('#user-name').text();
    var html = $('<li class="message">').append(`<p class="message__name">
                                                   ${userName}
                                                   <span>
                                                     ${message.created_at}
                                                   </span>
                                                 </p>
                                                 <p class="message__text">
                                                   ${message.text}
                                                 </p>`);
    return html;
  };

  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    var textField = $('#message_text');
    var message = textField.val();
    var s = $(location).attr('pathname');
    s = s.split('/');
    $.ajax({
      type: 'POST',
      url: '/groups/' + s[2] + '/messages',
      data: {
        message: {
          text: message
        }
      },
      dataType: 'json'
    })
    .done(function(data) {
      var html = buildHTML(data);
      $('#messages').append(html);
      textField.val("");
    })
  });
});
