function HttpRequests(method, url, callback)
{
    var xhr = new XMLHttpRequest()

    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            if(callback === null)
            {
                console.log(this.responseText)
            }
            else
            {
                callback(this.responseText)
            }
        }
    }
    xhr.open(method, url)
    xhr.send()

}


//creating a new playlist
function createNewPlaylist() {
    console.log("creating new playlist")

    var play_create = document.getElementById("Pl_name").value;
    var url = "/newplaylist?title=" + play_create

    HttpRequests("GET" ,url, showData)
}



function pullData(callback) {
    console.log("pulling..........")
    var url = "/pullplaylist"

    HttpRequests("GET", url, callback)
}

function showData(data) 
{
    document.getElementById("video_body").style.display = "none";
    document.querySelector("#Playlist_body").style.display = "block";

    console.log("Showing__" + data)
    var jsondata = JSON.parse(data)

    var playlist = document.getElementById('Playlist_content')
    playlist.innerHTML = "";

    jsondata.forEach( (e) => {
        var playlist_elem = document.createElement('div')

        playlist_elem.innerHTML = `<div class="card" id="playlist_card">
                                        <div class="card-content">
                                            <div class="card-title"><a id="`+ e.plId +`" onclick="openPlaylist()" href="#modal_playlist_videos" class="modal-trigger">`
                                                + e.pl_title +
                                                `</a><button style="float: right;" type="submit" id="`+ e.plId +`"
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
function openPlaylist()
{
    var Playlist_id = event.target.id
    var url = "/pullvideos?plid=" + Playlist_id

    HttpRequests("GET", url, showVideos)
}


function showVideos(data)
{
    var Json = JSON.parse(data)

    // console.log(Json)

    var videosTo = document.getElementById("show_videos_playlist")
    videosTo.innerHTML = ""
 
    Json.forEach((e)=>{
        var playlist_elem = document.createElement('div')

        playlist_elem.innerHTML = `<div class="col s2 container">
                                        <div class="card" style="height: 225px;">
                                            <div class="card-content" style="height: 226px;">
                                                <figure style="width: 180px;height: 175px;margin:0;">
                                                    <img src="`+ e.img +`" alt="test"
                                                        style="max-width: 100%;height: 155px;">
                                                </figure>
                                                <a href="https://www.youtube.com/watch?v=`+ e.vid +`" target="_blank">`+ e.title +`</a>
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

video_buttons.addEventListener("click", function(){
    if(event.target.classList.contains("add_playlist"))
    {
        title = event.target.getAttribute("data-title")
        img = event.target.getAttribute("data-img")
        vid = event.target.getAttribute("data-id")
        console.log(title+"  "+img+"  "+vid)
    }

})

video_add_buttons.addEventListener("click", function(){
    if(event.target.classList.contains("add_video"))
    {
        // console.log(event.target)
        plid = event.target.getAttribute("data-plid")
        console.log(title+"  "+img+"  "+vid+"  "+plid)
        SendVideo()
    }

})


//show playlist buttons in the modal
function showPlaylist(data)
{
    // console.log(data)
    var AddPlaylist = document.getElementById("addPlay_id")
    // console.log(AddPlaylist)
    AddPlaylist.innerHTML = "";

    var jsondata = JSON.parse(data)

    jsondata.forEach((e) =>{
        // console.log(e.plId)

        var playlist_elem_modal = document.createElement("div")
        playlist_elem_modal.innerHTML = `<a class="btn waves-effect waves-light red modal-close add_video" 
                                            data-plid="`+ e.plId + `">`+ e.pl_title +`</a>`

                                            // console.log(playlist_elem_modal)

        AddPlaylist.appendChild(playlist_elem_modal)
    })
}


//send video data to backend using xhr
function SendVideo()
{
    var url = "/addvideos?title=" + title + "&img=" + img + "&vid=" +vid+ "&plid=" + plid

    HttpRequests("POST", url, null)
}