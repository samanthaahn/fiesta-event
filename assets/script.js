
function findmovie(moviename) {

var queryMovie = 'https://www.omdbapi.com/?apikey=ea0f7fcf&t=' + moviename
fetch(queryMovie)
.then(function(response) {
    return response.json();
})
.then(function(data) {
    console.log(data);
})
}


//function for the button
var searchformEl = document.querySelector('#search-form');
var genreFormEl = document.querySelector('#format-input');
var resultscontentEl = document.querySelector('.resultcontent');
function handleSearchFormSubmit(event) {
  event.preventDefault();

  var searchInputVal = document.querySelector('#search-input').value;
  // var formatInputVal = document.querySelector('#format-input').value;

  if (!searchInputVal && !genreFormEl.value) {
    console.error('You need input something to search up or click a genre!');
    return;
  }

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

        for (var i = 0; i < items.length; i++) {
          var { volumeInfo } = items[i];
          printResults(volumeInfo);
          findmovie(volumeInfo.title);
        }
      });
  }
}

function printResults(authorList) {
  console.log(authorList);


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

function handleGenreSubmit() {
  var queryFormat =
    'https://www.googleapis.com/books/v1/volumes?q=subject:' +
    genreFormEl.value;

  fetch(queryFormat)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      //add create element, textContent, append
    });
}

if (genreFormEl.value) {
handleGenreSubmit();
}

searchformEl.addEventListener('submit', handleSearchFormSubmit);



// Dan Author and Genre Search Buttons

var btnAuthor = document.querySelector('.btn-author');
var formInputBox = document.getElementById('search-input');
var btnSearch = document.getElementById('btn-search');
var btnGenre = document.querySelector('.btn-genre');
var orParagraph = document.getElementById('p-or');
var genreMenu = document.getElementById('format-input');

btnAuthor.addEventListener('click', function() {
  console.log('Author clicked!');
  btnAuthor.classList.add('hide');
  btnGenre.classList.add('hide');
  formInputBox.classList.remove('hide');
  btnSearch.classList.remove('hide');
  orParagraph.classList.add('hide');
});

btnGenre.addEventListener('click', function() {
  console.log('Genre clicked!');
  btnGenre.classList.add('hide');
  btnAuthor.classList.add('hide');
  genreMenu.classList.remove('hide');
  btnGenre.classList.add('hide');
  orParagraph.classList.add('hide');
  btnSearch.classList.remove('hide');
});
