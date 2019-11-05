$(document).ready(function(){

    const videoList = $('#videoList'),
    player = $('#player');

    function init () {
        $.getJSON('json/videos.json', function(data){
            displayVideos(data.videos);
            addListeners();
        });
    }



    function displayVideos (videos) {
        let string = ""
        $.each(videos, function(i, video){
            getVideoHTML(video)
            string += getVideoHTML(video)
        })
        videoList.html(string)
    }

    function getVideoHTML(video) {
        return `
        <div class='videoItem' data-id='${video.id}'>
            <div>
                <img src="https://img.youtube.com/vi/${video.id}/default.jpg" alt="video-thumbnail">
            </div>
            <div>
                <h4>${video.title}</h4>
                <p>${video.category}</p>
            </div>
        </div>
        `
    }

    function addListeners () {
        $('.videoItem').on('click', function () {
            let videoId = $(this).data('id')
            playVideo(videoId)
        });
    }

    function playVideo (id) {
        player.attr('src', `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1&autohide=1&showinfo=0&controls=0&autoplay=1`)
    }

    init()




})