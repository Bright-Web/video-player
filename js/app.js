$(document).ready(function(){

    const EL_VIDEO_LIST = $('#videoList'),
    EL_PLAYER = $('#player'),
    EL_SEARCH_BOX = $('#searchBox'),
    EL_CATEGORIES_LIST = $('.categoriesList'),
    EL_NAV_ITEM = $('.nav-link'),
    EL_SCREENS = $('.screen')
    ;

    let videosArr = [];

    
    function init () {
        $.getJSON('json/videos.json', function(data){
            $('.lightbox').hide();
            videosArr = data.videos;
            displayVideos(videosArr);
        });

        $.getJSON('json/categories.json', function(data) {
            let categoriesArr = data.categories;
            displayCategories(categoriesArr);
        });

        EL_SEARCH_BOX.on('keyup', function(event){
            event.preventDefault();

            if(event.which === 13){
                let video = getVideoById($(this).val())    
                if (video){
                    displayVideos([video])
                }else{
                    displayVideosByTitle($(this).val())
                }            
            }

        });
        EL_NAV_ITEM.on('click', switchScreens);

    }

    function displayVideos (videos) {
        let string = ""
        $.each(videos, function(i, video){
            getVideoHTML(video)
            string += getVideoHTML(video)
        })
        EL_VIDEO_LIST.html(string)
        addClickListeners();
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

    function addClickListeners () {
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
        EL_PLAYER.attr('src', `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1&autohide=1&showinfo=0&autoplay=1`)
    }
    function stopVideo (id) {
        EL_PLAYER.attr('src', ``)
    }


    function displayVideosByTitle (title) {
        let filteredVideos = [];
        $.each(videosArr, function(i, video){
            if(video.title.includes(title)){
                filteredVideos.push(video);
            }  
        });
        displayVideos(filteredVideos)
    }

    function displayCategories (categoriesArr) {
        let string = "";
        $.each(categoriesArr, function(i, category){
            string += getCategoriesHtml(category);
        });
        EL_CATEGORIES_LIST.html(string);
        addCategoryListeners()

    }

    function getCategoriesHtml (category) {
        return `
        <li class="nav-item">
            <a class="nav-link categoryItem" href="#" data-category="${category.title}">${category.title}</a>
        </li>
        `
    }

    function addCategoryListeners () {
        $('.categoryItem').on('click', function () {
            let category = $(this).data('category');
            displayVideosByCategory(category);
        })
    }

    function displayVideosByCategory (category) {
        let filteredVideos = [];
        $.each(videosArr, function(i, video){
            if(category === video.category){
                filteredVideos.push(video);
            }
        });
        displayVideos(filteredVideos);
    }

    function getVideoById (input) {
        for (let i = 0; i < videosArr.length; i++) {
            if (input === videosArr[i].id) {
                return videosArr[i]
            }            
        }
        return null
    }


    init()

    function switchScreens () {
        EL_SCREENS.hide();
        $('#' + $(this).data('screen')).show();

    }


})