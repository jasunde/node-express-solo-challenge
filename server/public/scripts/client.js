$(document).ready(function () {

  getJokes();

  function appendJokes(jokes) {
    var $jokeDiv = $('#jokes');
    jokes.forEach(function (joke) {
      var $joke = $('<article class="joke"></article>');
      $joke.append('<h2>' + joke.whoseJoke + '</h2>');
      $joke.append('<p class="set-up">' + joke.jokeQuestion + '</p>');
      $joke.append('<p class="punch-line">' + joke.punchLine + '</p>')

      $jokeDiv.append($joke);
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
