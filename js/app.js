$(document).ready(function(){

    const videoList = $('#videoList'),
    player = $('#player');

    function init () {
        $.getJSON('json/videos.json', function(data){
            $('.lightbox').hide();
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
                <img src="https://img.youtube.com/vi/${video.id}/hqdefault.jpg" alt="video-thumbnail">
            </div>
            <div class='videoInfo'>
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
            $('.lightbox').show();
        });
        $('.lightbox').on('click', function(){
            $('.lightbox').hide();
            stopVideo();
        })
    }

    function playVideo (id) {
        player.attr('src', `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1&autohide=1&showinfo=0&controls=0&autoplay=1`)
    }
    function stopVideo (id) {
        player.attr('src', ``)
    }

    init()




})