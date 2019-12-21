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

    axios.get("/login?id=" + id_token + "&name=" + name + "&img=" + img + "&email=" + email)
        .then(signOut())
        .then(setTimeout(()=>{window.location.replace("/Home.html")},1000))
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

    axios.get("/logout")
        // .then(window.location = "https://mail.google.com/mail/u/0/?logout&hl=en")
        .then(setTimeout(()=>{document.location.replace("/loginPage")},1000))
        .catch(false)

}





//initializer for YouTube API
function init() {
    gapi.client.setApiKey("AIzaSyBjjQ7FfEoQqusgnvFhj7PtaWuZ43TCay0")
    return gapi.client.load("youtube", "v3", function () {
        console.log("API loaded successfully")
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
                maxResults: 12,
                order: "viewCount",
                publishedAfter: "2015-01-01T00:00:00Z"
            });


            request.execute(function (response) {
                // console.log(response)
                var results = response.result.items;
                createDiv(results)
            })

            form.reset()
        }
    }
})()


//Creating new video items and displaying
function createDiv(items) {

    document.getElementById("video_body").style.display="block"
    document.getElementById("Playlist_body").style.display="none"
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
                                            <a href=" https://www.youtube.com/watch?v=`+ element.id.videoId + `">` + element.snippet.title.slice(0, 25) + `</a>
                                            <a href="#modal_add" class="btn-floating btn-large waves-effect waves-light red modal-trigger add_playlist" style="float: right;" onclick="pullData(showPlaylist)"
                                                data-id=" `+ element.id.videoId + ` " data-img="` + element.snippet.thumbnails.high.url + `" data-title="` + element.snippet.title + `">+</a>
                                        </div>
                                    </div>
                                </div>`

        videos.appendChild(video_elem)
    });
}





//playling videos in a seperate page






/*---------------------------------------------Playlist operations---------------------------------------------*/

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

    if(play_create)
    {
        console.log("creating new playlist")
    
        var url = "/newplaylist?title=" + play_create
    
        HttpRequests("GET", url, showData)

    }
    else
    {
        alert("Your playlist should have a name")
    }
    
}



function pullData(callback) {
    console.log("pulling..........")
    var url = "/pullplaylist"

    HttpRequests("GET", url, callback)
}

function showData(data) {
    document.getElementById("video_body").style.display = "none";
    document.querySelector("#Playlist_body").style.display = "block";

    console.log("Showing__" + data)
    var jsondata = JSON.parse(data)

    var playlist = document.getElementById('Playlist_content')
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


//open modal to show playlist videos
function openPlaylist() {
    var Playlist_id = event.target.getAttribute("data-plid")
    var url = "/pullvideos?plid=" + Playlist_id

    HttpRequests("GET", url, showVideos)
}


function showVideos(data) {
    var Json = JSON.parse(data)

    console.log(Json)

    document.getElementById("video_body").style.display = "block";
    document.querySelector("#Playlist_body").style.display = "none";

    var videosTo = document.getElementById("video_body")
    videosTo.innerHTML = ""

    Json.forEach((e) => {
        var playlist_elem = document.createElement('div')

        playlist_elem.innerHTML = `<div class="col s3 container">
                                    <div class="card" style=" height: 335px;">
                                        <div class="card-content" style="height: 300px;">
                                            <figure style="width:260px;height:265px;margin:0;">
                                                <img src="`+ e.img + `" alt="test"
                                                    style="max-width: 100%;height: 250px;">
                                            </figure>
                                            <a href=" https://www.youtube.com/watch?v=`+ e.vid.trim() + ` " target="_blank">` + e.title.slice(0, 25) + `... </a>
                                            
                                            <a href="#modal_add" class="btn waves-effect waves-light red add_playlist" id="`+ e.ucode + `" data-plid="` + e.plid.trim() + `"
                                            style="float: right; position:absolute" onclick="Deletevideo()" >delete</a>
                                        </div>
                                    </div>
                                </div>`

        // console.log(playlist_elem)
        videosTo.appendChild(playlist_elem)
    })
}


//button actions to add videos to playlist
var video_buttons = document.getElementById("video_body")
var video_add_buttons = document.getElementById("addPlay_id")
var title, img, vid, plid;

video_buttons.addEventListener("click", function () {
    if (event.target.classList.contains("add_playlist")) {
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


//show playlist buttons in the modal
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


//send video data to backend using xhr
function SendVideo() {
    var url = "/addvideos?title=" + title + "&img=" + img + "&vid=" + vid + "&plid=" + plid

    HttpRequests("POST", url, null)
}



function Deletevideo() {
    console.log(event.target.id)

    var plid = event.target.getAttribute("data-plid")
    var ucode = event.target.id;
    var url = "/deletevideos?ucode=" + ucode

    HttpRequests("GET", url, null)

    //pull videos again
    var url1 = "/pullvideos?plid=" + plid

    setTimeout(()=>{
        HttpRequests("GET", url1, showVideos)
    },800)

}


function Deleteplaylist() {
    console.log(event.target.id)

    var plid = event.target.id;
    var url = "/deleteplaylist?plid=" + plid

    HttpRequests("POST", url, null)

    // window.location.href="/Home.html"
    // var xhr = new XMLHttpRequest()

    // setTimeout(() => {xhr.onreadystatechange = function () {
    //     if (this.readyState == 4 && this.status == 200) {
    //         showData(this.responseText)
    //     }
    // }
    // xhr.open("GET", "/pullplaylist")
    // xhr.send()}, 100)

    setTimeout( () => {
        HttpRequests("GET", "/pullplaylist", showData)
    }, 800)

}