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

    axios.get("http://localhost:8080/login?id=" + id_token + "&name=" + name + "&img=" + img + "&email=" + email)
        .then(signOut())
        .then(window.location.replace("/Home.html"))
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

    axios.get("http://localhost:8080/logout")
        .then(window.location = "https://mail.google.com/mail/u/0/?logout&hl=en")
        .then(document.location.replace("/loginPage"))
        .catch(false)

}













//initializer for YouTube API

function init() {
    gapi.client.setApiKey("AIzaSyBjjQ7FfEoQqusgnvFhj7PtaWuZ43TCay0")
    return gapi.client.load("youtube", "v3", function () {
        console.log("API loaded successfully")
    })
}


//Search functionality

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


//Creating new items and displaying

function createDiv(items) {

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
                                            <a href=" https://www.youtube.com/watch?v=`+ element.id.videoId + ` " target="_blank"> ` + element.snippet.title.slice(0, 25) + `... </a>
                                            <a href="#modal_add" class="btn-floating btn-large waves-effect waves-light red modal-trigger"
                                                style="float: right;" id=" `+ element.id.videoId + ` ">+</a>
                                        </div>
                                    </div>
                                </div>`

        videos.appendChild(video_elem)
    });
}






//Playlist operations
function createNewPlaylist() {
    let play_create = document.getElementById("Pl_name").value;
    // console.log(play_create)
    let url = "/newplaylist?title=" + play_create

    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText)
            showData(this.responseText)
        }
    }
    xhr.open("GET", url)
    xhr.send()

}


function pullData() {
    console.log("pulling..........")
    let url = "/pullplaylist"
    let xhr = new XMLHttpRequest()

    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // console.log(this.responseText)
            showData(this.responseText)
        }
    }
    xhr.open("GET", url)
    xhr.send()
}

document.getElementById("playlist_button").addEventListener("click", pullData)

function showData(data) 
{
    document.getElementById("video_body").style.display = "none";
    document.querySelector("#Playlist_body").style.display = "block";

    // console.log("Showing__" + data)
    let jsondata = JSON.parse(data)

    var playlist = document.getElementById('Playlist_content')
    playlist.innerHTML = "";

    jsondata.forEach( (e) => {
        var playlist_elem = document.createElement('div')

        playlist_elem.innerHTML = `<div class="card" id="playlist_card">
                                        <div class="card-content">
                                            <div class="card-title">`
                                                + e.pl_title +
                                                `<button style="float: right;" type="submit" id="`+ e.plId +`"
                                                    class="btn waves-effect waves-light grey darken-3 Playlist_delete"> Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>`

        console.log(playlist_elem)

        playlist.appendChild(playlist_elem)
    });
}