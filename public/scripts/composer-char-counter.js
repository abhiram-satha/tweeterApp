$(document).ready(function() {
  let counter = 140;
  $('#char-counter').val(counter)
   $('#tweet-text').on('input', function(event) {
    $('#char-counter').val(counter - $(this).val().length);
    if($(this).val().length > 140) {
      $('#char-counter').css('color', '#ff0000');
     } else {
       $('#char-counter').css('color', '#545149');
       
     }
     
    
     })
     
 });