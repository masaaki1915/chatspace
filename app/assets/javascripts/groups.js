$(function(){
  var preName;
  var preFunc;

  function buildUserList(users) {
    var html = '';
    $.each(users, function(index, user) {
      html += '<div class="chat-group-user clearfix">' +
                '<p class="chat-group-user__name">' +
                  user.name +
                  '<a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="' + user.id + '" data-user-name="' + user.name + '">' +
                    '追加' +
                  '</a>' +
                '</p>' +
              '</div>';
    });
    return html;
  }

  function buildMemberList(id, name){
    var html = '<div class="chat-group-user clearfix" id="chat-group-user-' + id + '">' +
                 '<input type="hidden" name="group[user_ids][]" value="' + id + '">' +
                   '<p class="chat-group-user__name">' +
                     name +
                     '<a class="user-search-remove chat-group-user__btn chat-group-user__btn--remove" data-user-id="' + id + '">' +
                       '削除' +
                     '</a>' +
                   '</p>' +
               '</div>';
    return html;
  }

  $(document).on('keyup', '.chat-group-form__input',
  function() {
    var name = $(this).val();
    var ajaxSearch = function(){
      $.ajax({
        type: 'GET',
        url: '/groups/ajax_user_list.json',
        data: {
          keyword: name
        },
        dataType: 'json',
      })
      .done(function(data) {
        var html = buildUserList(data);
        $('#user-search-result').html(html);
      });
    };

    // 入力されて500秒ごとに検索
    if (name != preName && name.length !== 0){
      clearTimeout(preFunc);
      preFunc = setTimeout(ajaxSearch, 500);
    }
    preName = name;
  });

  // 「追加」ボタンを押すとリストに追加
  $(document).on('click', '.user-search-add', function(){
    var id = $(this).attr('data-user-id');
    var name = $(this).attr('data-user-name');
    $(this).parent().hide();
    var html = buildMemberList(id, name);
    $('#chat-group-users').append(html);
  });

  // 「削除」ボタンを押すとリストから消す
  $(document).on('click', '.user-search-remove', function(){
    var id = $(this).attr('data-user-id');
    $('.user-search-add[data-user-id=' + id + ']').parent().show();
    $(this).parent().remove();
  });
});