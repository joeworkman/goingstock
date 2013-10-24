$('[name=gogo]').on('click', function() {
  $.ajax({
    url: '/user',
    type: 'POST',
    data: JSON.stringify({
      username: $('[name=username]').val(),
      firstName: $('[name=firstName]').val(),
      lastName: $('[name=lastName]').val()
    }),
    contentType: 'application/json',
    success: function(data) {
      if(!data.error) {
        window.location = '/user/' + data.id;
      }
    },
    complete: function(xhr, status) {
      console.log(xhr);
      console.log(status);
    }
  });
});