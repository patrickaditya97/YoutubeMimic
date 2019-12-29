function onSignIn(googleUser) {

    var profile = googleUser.getBasicProfile();
    // var id_token = googleUser.getAuthResponse().id_token;
    var id_token = profile.getId();
    var name = profile.getName();
    var img = profile.getImageUrl();
    var email = profile.getEmail();

    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log(name + ' Name: ' + profile.getName());
    console.log(img + 'Image URL: ' + profile.getImageUrl());
    console.log(email + 'Email: ' + profile.getEmail());

    fetch("/login?id=" + id_token + "&name=" + name + "&img=" + img + "&email=" + email)
        .then(signOut())
        .then(setTimeout(() => { window.location.replace("/Home.html") }, 1000))
        .catch(false)
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        auth2.disconnect();
        console.log('User signed out.');
    });
}

function signUserOut() {

    fetch("/logout")
        .then(setTimeout(() => { document.location.replace("/loginPage") }, 1000))
        .catch(false)

}





//initializer for YouTube API
function init() {
    gapi.client.setApiKey("AIzaSyBjjQ7FfEoQqusgnvFhj7PtaWuZ43TCay0")
    return gapi.client.load("youtube", "v3", function () {
        console.log("API loaded successfully")

        // function execute() {
            return gapi.client.youtube.search.list({
                "part": "snippet",
                "location": "20.5937,78.9629",
                "locationRadius": "1000km",
                "maxResults": 12,
                "order": "relevance",
                "publishedAfter": "2015-01-01T00:00:00Z",
                "type": "video"
            })
            .then(function (response) {
                // Handle the results here (response.result has the parsed body).
                console.log("Response", response);
                var results = response.result.items;
                createVideoDiv(results)
            },
                function (err) { console.error("Execute error", err); });
        // }

    })
}


//Search functionality for youtube videos
(function () {
    console.log("hello")
    var form = document.getElementById("searchForm")

    form.onsubmit = function (e) {
        e.preventDefault();
        // console.log(form.searchTerm.value);

        if (form.searchTerm.value) {
            var request = gapi.client.youtube.search.list({
                part: "snippet",
                type: "video",
                q: encodeURIComponent(form.searchTerm.value).replace(/%20/g, "+"),
                safeSearch: "strict",
                maxResults: 12,
                order: "viewCount",
                publishedAfter: "2015-01-01T00:00:00Z"
            });


            request.execute(function (response) {
                // console.log(response)
                var results = response.result.items;
                createVideoDiv(results)
            })

            form.reset()
        }
    }
})()


//Creating new video items by using youtube api data and displaying
function createVideoDiv(items) {

    document.getElementById("video_body").style.display = "block"
    document.getElementById("video_player").style.display = "none"
    document.getElementById("Playlist_body").style.display = "none"

    var videos = document.getElementById('video_body')
    videos.innerHTML = "";

    items.forEach(element => {
        var video_elem = document.createElement('div')
        video_elem.innerHTML = `<div class="col s3 container">
                                    <div class="card" style=" height: 335px;">
                                        <div class="card-content" style="height: 300px;">
                                            <figure style="width:260px;height:265px;margin:0;">
                                                <img src="` + element.snippet.thumbnails.high.url + `" alt="test"
                                                    style="max-width: 100%;height: 250px;">
                                            </figure>
                                            <a href="#`+ element.id.videoId + `" data-vid="` + element.id.videoId + `" onclick="openvideo()">
                                                <span data-vid="`+ element.id.videoId + `" title="` + element.snippet.title + `">
                                                    ` + element.snippet.title.slice(0, 25) + `
                                                </span>
                                            </a>
                                            <a href="#modal_add" class="btn-floating btn-large waves-effect waves-light red modal-trigger add_playlist" 
                                                style="float: right;" onclick="pullData(showPlaylist)"
                                                data-id="`+ element.id.videoId + `" data-img="` + element.snippet.thumbnails.high.url + `" data-title="` + element.snippet.title + `">+</a>
                                        </div>
                                    </div>
                                </div>`

        videos.appendChild(video_elem)
    });
    openSuggestions(items)
}





//playling videos in a seperate page along with other video suggestions
function openvideo() {
    console.log(document.getElementById("add_sug_playlist"))

    document.getElementById('video_body').style.display = "none"
    document.getElementById('video_player').style.display = "block"

    var video_id = event.target.getAttribute("data-vid")

    document.getElementById('yt_iframe').setAttribute('src', "https://www.youtube.com/embed/" + video_id)

}

//show's the videos displayed for search on a side bar
function openSuggestions(item) {
    console.log(item)

    var videos = document.getElementById('video_sug')
    videos.innerHTML = "";

    item.forEach(element => {

        var video_elem = document.createElement('div')
        video_elem.innerHTML = `<div class="card" style="margin-top: 0px;height: 140px;">
                                    <div class="card-content" style="padding: 0px;">
                                        <figure style="width: 140px;height: 140px;position: absolute;margin:0;">
                                            <img src="`+ element.snippet.thumbnails.high.url + `" alt="test"
                                                style="max-width: 100%;height: 100%;float: left;">
                                        </figure>

                                        <a href="#`+ element.id.videoId + `" data-vid="` + element.id.videoId + `" onclick="openvideo()" style=" position: absolute; bottom: 0; left: 150px;">
                                            <span data-vid="`+ element.id.videoId + `" title="` + element.snippet.title + `" >
                                                ` + element.snippet.title.slice(0, 25) + `
                                            </span>
                                        </a>

                                        <a href="#modal_add" class="btn-floating btn-large waves-effect waves-light red modal-trigger add_sug_playlist" 
                                            style="margin-top:10px;float: right;" onclick="pullData(showPlaylist)"
                                            data-id="`+ element.id.videoId + ` " data-img="` + element.snippet.thumbnails.high.url + `" data-title="` + element.snippet.title + `">+</a>
                                    </div>
                                </div>`

        videos.appendChild(video_elem)
    });
}




/*---------------------------------------------Playlist operations---------------------------------------------*/

//Http requests are handled through this with callback
function HttpRequests(method, url, callback) {
    var xhr = new XMLHttpRequest()

    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            if (callback === null) {
                console.log(this.responseText)
            }
            else {
                callback(this.responseText)
            }
        }
    }
    xhr.open(method, url)
    xhr.send()

}


//creating a new playlist
function createNewPlaylist() {
    var play_create = document.getElementById("Pl_name").value;

    if (play_create) {
        console.log("creating new playlist")

        var url = "/newplaylist?title=" + play_create

        HttpRequests("GET", url, showData)

    }
    else {
        alert("Your playlist should have a name")
    }

}


//pulling playlists from the datastore
function pullData(callback) {
    console.log("pulling..........")
    var url = "/pullplaylist"

    HttpRequests("GET", url, callback)
}

//shows the pulled data in a stylized form
function showData(data) {
    document.getElementById("video_body").style.display = "none";
    document.getElementById("video_player").style.display = "none";
    document.querySelector("#Playlist_body").style.display = "block";

    console.log("Showing__" + data)
    var jsondata = JSON.parse(data)

    var playlist = document.getElementById('Playlist_content')

    if(jsondata.length>0)
    {

        playlist.innerHTML = "";
    
        jsondata.forEach((e) => {
            var playlist_elem = document.createElement('div')
    
            playlist_elem.innerHTML = `<div class="card" id="playlist_card">
                                            <div class="card-content">
                                                <div class="card-title">
                                                    <a data-plid="`+ e.plId + `" onclick="openPlaylist()" href="#modal_playlist_videos">`
                + e.pl_title +
                `</a>
                                                    <button style="float: right;" type="submit" id="` + e.plId + `" onclick="Deleteplaylist()"
                                                        class="btn waves-effect waves-light grey darken-3 modal-close Playlist_delete"> Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>`
    
            // console.log(playlist_elem)
    
            playlist.appendChild(playlist_elem)
        });

    }
    else
    {
        playlist.innerHTML =   `<div class="card" >
                                    <div class="card-content">
                                        <h5 style="text-align:center">Create a new playlist to view them here</h5>
                                    </div>
                                </div>`
    }
}


//open modal to show playlist videos
function openPlaylist() {
    var Playlist_id = event.target.getAttribute("data-plid")
    var url = "/pullvideos?plid=" + Playlist_id

    HttpRequests("GET", url, showVideos)
}

//shows the playlist videos
function showVideos(data) {
    var Json = JSON.parse(data)

    console.log(Json)

    document.getElementById("video_body").style.display = "block";
    document.getElementById("video_player").style.display = "none";
    document.querySelector("#Playlist_body").style.display = "none";

    var videosTo = document.getElementById("video_body")

    if(Json.length>0)
    {

        videosTo.innerHTML = ""
    
        Json.forEach((e) => {
            var playlist_elem = document.createElement('div')
    
            playlist_elem.innerHTML =  `<div class="col s3 container">
                                            <div class="card" style=" height: 335px;">
                                                <div class="card-content" style="height: 300px;">
                                                    <figure style="width:260px;height:265px;margin:0;">
                                                        <img src="`+ e.img + `" alt="test"
                                                            style="max-width: 100%;height: 250px;">
                                                    </figure>
                                                    
                                                    <a href="#`+ e.vid.trim() + `" data-vid="` + e.vid.trim() + `" onclick="openvideo()">
                                                        <span data-vid="`+ e.vid.trim() + `" title="` + e.title + `">
                                                            ` + e.title.slice(0, 25) + `
                                                        </span>
                                                    </a>
                                                    <a href="#modal_add" class="btn waves-effect waves-light red add_playlist" id="`+ e.ucode + `" data-plid="` + e.plid.trim() + `"
                                                    style="float: right;" onclick="Deletevideo()" >delete</a>
                                                </div>
                                            </div>
                                        </div>`
    
            // console.log(playlist_elem)
            videosTo.appendChild(playlist_elem)
        })
    
        openPlaySuggestions(data)
    }
    else
    {
        videosTo.innerHTML =   `<div class="card" style="width: 700px;margin: 90px auto auto;display: block;">
                                    <div class="card-content">
                                        <h5 style="text-align:center">please add videos to playlist to view them here</h5>
                                    </div>
                                </div>`
    }

}

// shows the playlist videos in the sidebar after opening a video
function openPlaySuggestions(item) {
    console.log(item)
    var Json = JSON.parse(item)
    var videos = document.getElementById('video_sug')
    videos.innerHTML = "";

    Json.forEach(element => {

        var video_elem = document.createElement('div')
        video_elem.innerHTML = `<div class="card" style="margin-top: 0px;height: 140px;">
                                    <div class="card-content" style="padding: 0px;">
                                        <figure style="width: 140px;height: 140px;position: absolute;margin:0;">
                                            <img src="`+ element.img + `" alt="video image"
                                                style="max-width: 100%;height: 100%;float: left;">
                                        </figure>


                                        <a href="#`+ element.vid + `" data-vid="` + element.vid + `" onclick="openvideo()">
                                            <span data-vid="`+ element.vid + `" title="` + element.title + `" style=" position: absolute; bottom: 0; left: 150px;">
                                                ` + element.title.slice(0, 25) + `
                                            </span>
                                        </a>
                                        
                                        <a href="#modal_add" class="btn waves-effect waves-light red add_playlist" id="`+ element.ucode + `" data-plid="` + element.plid.trim() + `"
                                            style="float: right;" onclick="Deletevideo()" >delete</a>

                                    </div>
                                </div>`

        videos.appendChild(video_elem)
    });
}

//button actions that collect video data to add videos to playlist
var video_sug_buttons = document.getElementById("video_player")
var video_buttons = document.getElementById("video_body")
var video_add_buttons = document.getElementById("addPlay_id")
var title, img, vid, plid;

console.log(video_sug_buttons)

video_buttons.addEventListener("click", function () {
    if (event.target.classList.contains("add_playlist")) {
        title = event.target.getAttribute("data-title")
        img = event.target.getAttribute("data-img")
        vid = event.target.getAttribute("data-id")
        console.log(title + "  " + img + "  " + vid)
    }
})

video_sug_buttons.addEventListener("click", function () {
    if (event.target.classList.contains("add_sug_playlist")) {
        title = event.target.getAttribute("data-title")
        img = event.target.getAttribute("data-img")
        vid = event.target.getAttribute("data-id")
        console.log(title + "  " + img + "  " + vid)
    }
})

video_add_buttons.addEventListener("click", function () {
    if (event.target.classList.contains("add_video")) {
        // console.log(event.target)
        plid = event.target.getAttribute("data-plid")
        console.log(title + "  " + img + "  " + vid + "  " + plid)
        SendVideo()
    }

})


//show playlists as buttons in the modal
function showPlaylist(data) {
    // console.log(data)
    var AddPlaylist = document.getElementById("addPlay_id")
    // console.log(AddPlaylist)
    AddPlaylist.innerHTML = "";

    var jsondata = JSON.parse(data)

    jsondata.forEach((e) => {
        // console.log(e.plId)

        var playlist_elem_modal = document.createElement("div")
        playlist_elem_modal.innerHTML = `<a class="btn waves-effect waves-light red modal-close add_video" 
                                            data-plid="`+ e.plId + `">` + e.pl_title + `</a>`

        // console.log(playlist_elem_modal)

        AddPlaylist.appendChild(playlist_elem_modal)
    })
}


//send video data to backend using xhr and add to a playlist
function SendVideo() {
    var url = "/addvideos?title=" + title + "&img=" + img + "&vid=" + vid + "&plid=" + plid

    HttpRequests("POST", url, null)
}


//delete a playlist video
function Deletevideo() {
    console.log(event.target.id)

    var plid = event.target.getAttribute("data-plid")
    var ucode = event.target.id;
    var url = "/deletevideos?ucode=" + ucode

    HttpRequests("GET", url, null)

    //pull videos again
    var url1 = "/pullvideos?plid=" + plid

    setTimeout(() => {
        HttpRequests("GET", url1, showVideos)
    }, 800)

}

// delete playlist
function Deleteplaylist() {
    console.log(event.target.id)

    var plid = event.target.id;
    var url = "/deleteplaylist?plid=" + plid

    HttpRequests("POST", url, null)

    setTimeout(() => {
        HttpRequests("GET", "/pullplaylist", showData)
    }, 800)

}