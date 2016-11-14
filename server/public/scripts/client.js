$(document).ready(function () {

  // jokeInput form submit handler
  $('#jokeInput').on('submit', sendJoke);

  getJokes();

  function appendJokes(jokes) {
    var $jokeDiv = $('#jokes');
    $jokeDiv.empty();
    
    jokes.forEach(function (joke) {
      var $joke = $('<article class="joke"></article>');
      $joke.append('<h2>' + joke.whoseJoke + '</h2>');
      $joke.append('<p class="set-up">' + joke.jokeQuestion + '</p>');
      $joke.append('<p class="punch-line">' + joke.punchLine + '</p>')

      $jokeDiv.append($joke);
    });
  }

  function sendJoke(event) {
    event.preventDefault();
    var jokeInput = {};
    $.each($(this).serializeArray(), function (i, obj) {
      jokeInput[obj.name] = obj.value;
    });

    $.ajax({
      type: 'POST',
      url: '/jokes',
      data: jokeInput,
      success: function (res) {
        getJokes();
      },
      error: function (err) {
        console.log(err);
      }
    });
  }

  function getJokes() {
    $.ajax({
      type: 'GET',
      url: '/jokes',
      success: function (jokes) {
        appendJokes(jokes);
      },
      error: function (err) {
        console.log('slight problem...', err);
      }
    });
  } // end getJokes
});
