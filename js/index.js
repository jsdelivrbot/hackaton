$('.login-form').submit(function(event){
  event.preventDefault();
   $('.login-page').hide();
   $('.home-page').show();
});
$('.logout-btn').click(function(event){
  event.preventDefault();
   $('.home-page').show();
   $('.login-page').show();
});