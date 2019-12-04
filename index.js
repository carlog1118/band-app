'use strict'

function addWikiText(wikiText){
    $('.js-wiki-results').empty();
    const wikiHtml= `<p>${wikiText}</p>`;
    $('.js-wiki-results').append(wikiHtml);
}

function getWiki(act){
    const wikiRoot= 'https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=';
    const wikiUrl= wikiRoot+act;
    fetch(wikiUrl)
    .then(function(response) {
    return response.json();
  }).then(function(data) {
    const pages = data.query.pages;
    const page = pages[Object.keys(pages)[0]];
    const wikiText= page.extract;
    addWikiText(wikiText);
  })
}

function watchForm(){
    $('form').submit(event => {
        event.preventDefault();
        var act= $('#js-act').val();
        getWiki(act);
    })
}

$(watchForm);