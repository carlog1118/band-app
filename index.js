'use strict'

//youtube
const tubeKey= 'AIzaSyAZ-g0mBy0mleLXXrYrLDhHlWBmJ7GE-vg';
const tubeUrl= 'https://www.googleapis.com/youtube/v3/search'

function addVideo(videoArray){
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
            for (var i=0; i<videos.length; i++){
                videoArray.push(videos[i].id.videoId);
            }
            videoArray = videoArray.filter(function( element ) {
                return element !== undefined;
             });

            addVideo(videoArray);
        })           
}


//wiki
/*function addWikiText(wikiText){
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
}*/


//bandsintown
function updateName(artistName){
    $('.js-artist-name').html(artistName);
}

function updateImg(bitImgUrl){
    $("#artist-image").css('background-image', `url(${bitImgUrl})` )
}

function addProfiles(fbUrl, bitPageUrl){
    $('ul').empty();
    $('ul').append(`<li><a href="${fbUrl}" target="_blank">Facebook Page</a></li>
    <li><a href="${bitPageUrl}" target="_blank">Bandsintown Page</a></li>`);
}

function getBit(act){
    const bitAct= encodeURIComponent(act);
    const bitUrl= `https://cors-anywhere.herokuapp.com/rest.bandsintown.com/artists/${bitAct}?app_id=586215c21aaf5f7d114220c3833318f0`
    fetch (bitUrl)
        .then (response => response.json())
        .then (responseJson =>{
            const artistName= responseJson.name;
            const bitImgUrl= responseJson.image_url;
            const fbUrl= responseJson.facebook_page_url;
            const bitPageUrl= responseJson.url;
            addProfiles(fbUrl, bitPageUrl);
            updateName(artistName);
            updateImg(bitImgUrl);
        })
}

function showResults(){
    $('main').removeClass('hidden');
}

function autoScroll(){
        $('html, body').animate({
            scrollTop: ($('.main-container').offset().top)
        },500)
    };



function watchForm(){
    $('form').submit(event => {
        event.preventDefault();
        var act= $('#js-act').val(); 
            act= act.replace(/\s/g, '') ;  
        var liveAct= act + 'live';
        /*getWiki(act);*/
        showResults();
        autoScroll();
        getYouTube(liveAct);
        getBit(act);
    })
}

$(watchForm);
