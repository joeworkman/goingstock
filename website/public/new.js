$('[name=gogo]').on('click', function() {
  $.ajax({
    url: '/stock',
    type: 'POST',
    data: JSON.stringify({
      symbol: $('[name=symbol]').val(),
      companyName: $('[name=companyName]').val(),
      companyLogoUrl: $('[name=companyLogoUrl]').val(),
      prices: $('[name=prices]').val()
    }),
    contentType: 'application/json',
    success: function(data) {
      if(!data.error) {
        window.location = '/stock/' + data.id;
      }
    },
    complete: function(xhr, status) {
      console.log(xhr);
      console.log(status);
    }
  });
});