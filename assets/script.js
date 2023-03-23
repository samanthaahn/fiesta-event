// OMDb API: http://www.omdbapi.com/?i=tt3896198&apikey=f5efd3a2
//API for movie/show info
// const fetch = require('node-fetch');

// const url = 'https://streaming-availability.p.rapidapi.com/v2/services';
// //API for streaming service
// const options = {
//     method: 'GET',
//     headers: {
//         'X-RapidAPI-Key': '3f0225be7bmshce5c6a43713c859p14d2adjsn50ce1176c7e8',
//         'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
//     }
// };

// fetch(url, options)
//     .then(res => res.json())
//     .then(json => console.log(json))
//     .catch(err => console.error('error:' + err));

//https://www.googleapis.com/books/v1/volumes?q=search+terms
//intitle:returns results where the text following this keyword is found in the title
//inauthor: Returns results where the text following this keyword is found in the author

//function for the button
var searchformEl = document.querySelector('#search-form');
// var genreFormEl = document.querySelector('#format-input').value;
var resultscontentEl = document.querySelector('.resultcontent');
var resultContentGenreEl= document.querySelector('#resultContentGenre')

searchformEl.addEventListener('submit', handleSearchFormSubmit);

function handleSearchFormSubmit(event) {
  event.preventDefault();

  var searchInputVal = document.querySelector('#search-input').value;
  // var formatInputVal = document.querySelector('#format-input').value;

  // if (!searchInputVal || !genreFormEl.value) {
  //   console.error('You need input something to search up or click a genre!');
  //   return;
  // }

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
        }
      })
  }
  //   var queryFormat =
  //   'https://www.googleapis.com/books/v1/volumes?q=subject:' +
  //   genreFormEl.value; 
  
  // fetch(queryFormat)
  // .then(function (response) {
  //   return response.json();
  // })
  // .then(function (data) {
  //   var {items} = data;
  //   for (var i = 0; i < items.length; i++) {
  //     var { volumeInfo } = items[i];
  //     printResultsGenre(volumeInfo);
  //   }

    //add create element, textContent, append
  };

// if (!searchInputVal || !genreFormEl.value) {
//   console.error('You need input something to search up or click a genre!');
//   return;
// }


function printResults(authorList) {
  console.log(authorList);
  if (!authorList.volumeInfo) {
    // console.error('You need input something to search up or click a genre!');
    return;
  } 
  //add create element, textContent, append

  // set up `<div>` to hold result content
  // var resultauthors = document.createElement('div');
  // resultauthors.classList.add('card', 'col-6');

  var resultCard = document.createElement('div');
  // resultCard.classList.add('card', 'bg-light', 'text-dark', 'mb-3', 'p-3');

  var resultBody = document.createElement('div');
  // resultBody.classList.add('card-body');
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
searchformEl.addEventListener('submit', handleSearchFormGenre);

function handleSearchFormGenre () {
var genreFormEl = document.querySelector('#format-input').value;
var queryFormat =
'https://www.googleapis.com/books/v1/volumes?q=subject:' +
genreFormEl 

fetch(queryFormat)
.then(function (response) {
return response.json();
})
.then(function (data) {
var { genres } = data;

for (var i = 0; i < genres.length; i++) {
  var { volumeInfo } = genres[i];
  printResultsGenre(volumeInfo);
}
}
)}

function printResultsGenre(genreList) {

  if (!genreList.volumeInfo) {
    // console.error('You need input something to search up or click a genre!');
    return;
  }
  
  var resultCardGenre = document.createElement('div');
  // resultCard.classList.add('card', 'bg-light', 'text-dark', 'mb-3', 'p-3');

  var resultBodyGenre = document.createElement('div');
  // resultBody.classList.add('card-body');
  resultCardGenre.append(resultBodyGenre);

  var titleElGenre = document.createElement('h3');
  titleElGenre.textContent = genreList.title;
  var genreElGenre = document.createElement('p');
  genreElGenre.textContent = genreList.categories

  var bodyContentElGenre = document.createElement('p');
  bodyContentElGenre.innerHTML =
    '<strong>Author:</strong> ' + genreList.authors + '<br/>';
  // var imageElGenre = document.createElement('img');
  // imageElGenre.src = genreList.imageLinks.smallThumbnail;

  resultBodyGenre.append(titleElGenre, bodyContentElGenre, genreElGenre);
  resultContentGenreEl.append(resultCardGenre);
}

// function handleGenreSubmit() {
//   var queryFormat =
//     'https://www.googleapis.com/books/v1/volumes?q=subject:' +
//     genreFormEl.value;

//   fetch(queryFormat)
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);

//       //add create element, textContent, append
//     });
// }
// if (genreFormEl.value) {
//   handleGenreSubmit();
// }

// searchformEl.addEventListener('submit', handleSearchFormSubmit);






// searchformEl.addEventListener('submit', handleSearchFormSubmit);

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
