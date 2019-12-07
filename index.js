'use strict'

//youtube
const tubeKey= 'AIzaSyAZ-g0mBy0mleLXXrYrLDhHlWBmJ7GE-vg';
const tubeUrl= 'https://www.googleapis.com/youtube/v3/search'

function addVideo(videoArray){
    console.log(videoArray);
    $('.js-youtube-results').empty();
    for (var y= 0; y< 3; y++){
        
        $('.js-youtube-results').append(`
        <iframe width="210" height="157" frameborder="0"
                            src="https://www.youtube.com/embed/${videoArray[y]}">
                            </iframe>
        `);
    }
}

function formatYouQueryString(youParams){
    const youQueryItems = Object.keys(youParams).map(key => `${[encodeURIComponent(key)]}=${encodeURIComponent(youParams[key])}`);
    return youQueryItems.join('&');
}

function getYouTube(liveAct){
    const youParams= {
        part: 'snippet',
        q: liveAct,
        maxResults: 10,
        key: tubeKey
    }
    const youQueryString=  formatYouQueryString(youParams);
    const tubeSearchUrl= tubeUrl + '?' + youQueryString;
    
    fetch(tubeSearchUrl)
        .then (response => response.json())
        .then (responseJson => {
            const videos= responseJson.items
            var videoArray= [];
            //var videoIdArray= [];
            for (var i=0; i<videos.length; i++){
                videoArray.push(videos[i].id.videoId);
            }
            //console.log(videoArray);
            /*for (var x=0; x<videoArray.length; x++){
                videoIdArray.push(videoArray[x].videoId)
            }*/
            videoArray = videoArray.filter(function( element ) {
                return element !== undefined;
             });

            addVideo(videoArray);
        })           
}



//wiki
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
        var liveAct= act + 'live'
        getWiki(act);
        getYouTube(liveAct);
    })
}

$(watchForm);
