// These are all our variable for the buttons on the main page. Specifically directing users to choose either author or genre
var btnAuthor = document.querySelector('.btn-author');
var formInputBox = document.getElementById('search-input');
var btnSearch = document.getElementById('btn-search-genre');
var btnGenre = document.querySelector('.btn-genre');
var orParagraph = document.getElementById('p-or');
var genreMenu = document.getElementById('format-input');
var btnSearchAuthor = document.getElementById('btn-search-author');


// The function for the movie api. This calls the movies that have the same title as the books. 
function findmovie(moviename) {

  var queryMovie = 'https://www.omdbapi.com/?apikey=ea0f7fcf&t=' + moviename
  fetch(queryMovie)
  .then(function(response) {
      return response.json();
  })
  .then(function(data) {
      console.log(data);
      if (data.Response==='True') {
        printResultsMovie(data);
      }
  })
  }
  
// These are the variables and the function that helps append the movies to the page.   
var resultContentMovieEl = document.querySelector('.resultContentMovies')

  function printResultsMovie(movieTitles) {
    console.log(movieTitles)
  
    var resultCardMovieEl = document.createElement('div');
  
    var resultBodyMovieEl = document.createElement('div');
    
    resultCardMovieEl.append(resultBodyMovieEl);
  
    var titleElMovie = document.createElement('h3');
    titleElMovie.textContent = movieTitles.Title;
  
    var imageElMovie = document.createElement('img');
    imageElMovie.src = movieTitles.Poster;
  
    resultBodyMovieEl.append(titleElMovie, imageElMovie);
    resultContentMovieEl.append(resultCardMovieEl);
  }

// These are the variables for the search and genre inputs. 
var searchformEl = document.querySelector('#search-form');
var resultscontentEl = document.querySelector('.resultcontent');
var resultContentGenreEl = document.querySelector('.resultContentGenre');

// This is the addEventListener that handles specifically the author input. 
btnSearchAuthor.addEventListener('click', handleSearchFormSubmit);

// This whole function runs the "author" book search.
function handleSearchFormSubmit(event) {
  event.preventDefault();

  var searchInputVal = document.querySelector('#search-input').value;

  if (searchInputVal) {
    var queryString =
      'https://www.googleapis.com/books/v1/volumes?q=inauthor:' +
      searchInputVal;

    fetch(queryString)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        var { items } = data;
        resultscontentEl.innerHTML = '';
        for (var i = 0; i < items.length; i++) {
          var { volumeInfo } = items[i];
          printResults(volumeInfo);
          findmovie(volumeInfo.title);
        }

      });
  }
}

// This will print the results of the authors the user inputted (basically this appends the results to the page).
function printResults(authorList) {
  console.log(authorList);

// These are all the element we created for the results when they are being appended. 
  var resultCard = document.createElement('div');

  var resultBody = document.createElement('div');

  resultCard.append(resultBody);

  var titleEl = document.createElement('h3');
  titleEl.textContent = authorList.title;

  var bodyContentEl = document.createElement('p');
  bodyContentEl.innerHTML =
    '<strong>Author:</strong> ' + authorList.authors + '<br/>';

  var imageEl = document.createElement('img');
  imageEl.src = authorList.imageLinks.smallThumbnail;

  resultBody.append(titleEl, bodyContentEl, imageEl);
  resultscontentEl.append(resultCard);
}

// This handles the genre button function. 
btnSearch.addEventListener('click', handleSearchFormGenre);

// This is the function that searches specifically by genre. 
function handleSearchFormGenre(event) {
  event.preventDefault();

  var genreFormEl = document.querySelector('#format-input').value;

  var queryFormat =
    'https://www.googleapis.com/books/v1/volumes?q=subject:' +
    genreFormEl

  fetch(queryFormat)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var { items } = data;
      resultContentGenreEl.innerHTML = '';
      for (var i = 0; i < items.length; i++) {
        var { volumeInfo } = items[i];
        printResultsGenre(volumeInfo);
      }
    }
    )
}

// This appends the page with the genre results. 
function printResultsGenre(genreList) {
  console.log(genreList)

  var resultCardGenre = document.createElement('div');
  var resultBodyGenre = document.createElement('div');

  resultCardGenre.append(resultBodyGenre);

  // These are the element we created for the genre results when they are being appended. 
  var titleElGenre = document.createElement('h3');
  titleElGenre.textContent = genreList.title;

  var genreElGenre = document.createElement('p');
  genreElGenre.textContent = genreList.categories

  var bodyContentElGenre = document.createElement('p');
  bodyContentElGenre.innerHTML =
    '<strong>Author:</strong> ' + genreList.authors + '<br/>';

  var imageElGenre = document.createElement('img');
  imageElGenre.src = genreList.imageLinks.smallThumbnail;

  resultBodyGenre.append(titleElGenre, bodyContentElGenre, genreElGenre, imageElGenre);
  resultContentGenreEl.append(resultCardGenre);

  findmovie(genreList.title);
}


// These are the Author and Genre Search Buttons that appear on the front page that guide the user to their specific searches. 

btnAuthor.addEventListener('click', function () {
  console.log('Author clicked!');
  btnAuthor.classList.add('hide');
  btnGenre.classList.add('hide');
  formInputBox.classList.remove('hide');
  btnSearchAuthor.classList.remove('hide');
  orParagraph.classList.add('hide');
});

btnGenre.addEventListener('click', function () {
  console.log('Genre clicked!');
  btnGenre.classList.add('hide');
  btnAuthor.classList.add('hide');
  genreMenu.classList.remove('hide');
  btnGenre.classList.add('hide');
  orParagraph.classList.add('hide');
  btnSearch.classList.remove('hide');
});