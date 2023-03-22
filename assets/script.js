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
var genreFormEl = document.querySelector('#format-input');

function handleSearchFormSubmit(event) {
    event.preventDefault();

    var searchInputVal = document.querySelector('#search-input').value;
    // var formatInputVal = document.querySelector('#format-input').value;

    if (!searchInputVal && !genreFormEl.value) {
        console.error('You need input something to search up or click a genre!');
        return;
    }
    var queryString = 'https://www.googleapis.com/books/v1/volumes?q=inauthor' + searchInputVal

    fetch(queryString)
   .then(function(response){
    return response.json()
   })
   .then(function(data){
    console.log(data)
   })

   var queryFormat = 'https://www.googleapis.com/books/v1/volumes?q=subject:' + genreFormEl.value

   function handleGenreSubmit(event) {
    event.preventDefault();
    ('#format-input').value;

    fetch(queryFormat)
    .then(function(response){
        return response.json()
    }) 
    .then(function(data){
        console.log(data)
    })


}

handleGenreSubmit();

}   





searchformEl.addEventListener('submit', handleSearchFormSubmit);