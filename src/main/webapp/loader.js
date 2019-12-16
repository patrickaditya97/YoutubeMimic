(function()
{
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:8080/checkSession")
    xhr.send() 

    xhr.onreadystatechange = function()
    {
        if(this.readyState == this.DONE && this.status == 200 )
        {
            if(this.response != "false")
            {
                // console.log('session available ' + this.responseText)
                document.getElementById('changeHere').innerHTML += '<button class="btn waves-effect waves-light red darken-3" type="submit" name="action" style="height: 3rem;margin-bottom: 6px; margin-left: 320px;"  onclick="signUserOut();">Logout</button>'
                document.getElementById('playListItem').style.display = 'block';
            }
            else
            {
                // console.log('session inavailable ' + this.responseText)
                document.getElementById('changeHere').innerHTML += `<button class="btn waves-effect waves-light red darken-3" type="submit" name="action" style="height: 3rem;margin-bottom: 6px; margin-left: 320px;" onclick="location.href='/loginPage'">Login</button>`
                document.getElementById('playListItem').style.display = 'none';
            }
        }
    }
})()


