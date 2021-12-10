const textbox = document.getElementById('tweet-text');
const charCounter = document.getElementById('char-counter');

$(document).ready(function() {
  let counter = 10;
  $(charCounter).val(counter);
  textbox.addEventListener('input', function(event) {
    if (event.data) {
      counter--;
    } else if (!event.data) {
      counter++;
    }
    if(counter < 0) {
      $(charCounter).css('color', '#ff0000');
    }
    $(charCounter).val(counter);
    })
    
});