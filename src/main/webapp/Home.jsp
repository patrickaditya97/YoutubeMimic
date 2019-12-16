<!-- <%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%> -->


<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="google-signin-client_id"
        content="952349414594-pd0unj1vs023229ufld4ec94q4b3a3cm.apps.googleusercontent.com">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
    <script src="https://apis.google.com/js/platform.js" async defer></script>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>

    <style>
        nav .brand-logo {
            padding-left: 15px;
        }

        input,
        select,
        textarea {
            color: white;
        }

        textarea:focus,
        input:focus {
            color: white;
        }

        nav {
            position: fixed;
            z-index: 1;
        }

        #video_body {
            /* display: none; */
            margin-top: 100px;
        }

        .nav_mobile {
            display: none
        }


        .btn-floating.btn-large 
        {
            width: 30px;
            height: 30px;
            padding: 0;
        }

        .btn-large 
        {
            line-height: 25px;
            font-size: 30px;
        }
    </style>

    <title>Welcome</title>
</head>

<body>

	<!-- <%
		response.setHeader("Cache-Control","no-store");
		response.setHeader("Pragma","no-cache"); 
		response.setHeader ("Expires", "0");
		
		System.out.println("second home " + session.getAttribute("email"));
		
		if(session.getAttribute("email") == null)
		{
			System.out.println("home " + session.getAttribute("email"));
			System.out.println();
			
			response.sendRedirect("/loginPage");
		} 
	%> -->

    <nav>
        <div class="nav-wrapper #212121 grey darken-4 z-depth-4">
            <a href="#" class="brand-logo"><img src="images/YouTube1.png" alt="Logo" style="width: 45px;"></a>

            <ul id="nav_mobile" class=" center hide-on-med-and-down">

                <li class="nav_items" id="playListItem" style="margin-left:80px;"><a href="#playlist.html">Playlist</a></li>

                <li class="nav_items">
                    <div class="input-field col s12 ">
                        <input type="text" id="autocomplete-input" class="grey darken-1"
                            style="padding-left: 5px; margin-left: 245px;">
                    </div>
                </li>

                <li class="nav_items">
                    <button class="btn waves-effect waves-light grey darken-3" type="submit" name="action"
                        style="height: 3rem;margin-bottom: 6px; margin-left: 270px;">Search</button>
                </li>

               <!--  <li class="nav_items">
                    <button class="btn waves-effect waves-light red darken-3" type="submit" name="action"
                        style="height: 3rem;margin-bottom: 6px; margin-left: 320px;"
                        onclick="signUserOut();">Logout</button>
                </li> -->

                <li class="nav_items" id="changeHere">


                </li>

            </ul>

        </div>
    </nav>

    <div>
        <div class="row">
            <div class="section"></div>
            <main>
                <div id="video_body">
                    <div class="row" style="margin-bottom: 20px;">
                        <div class="row" style="margin-top: 55px; padding: 20px;">

                            <div class="col s3 container">
                                <div class="card" style=" height: 335px;">
                                    <div class="card-content" style="height: 300px;">
                                        <img src="images/not_found.png" alt="test" height="50" style="height: 260px;">
                                        <a href="#">video 1</a>
                                        <a class="btn-floating btn-large waves-effect waves-light red" style="float: right;">+</a>
                                    </div>
                                </div>
                            </div>

                            <div class="col s3 container">
                                <div class="card" style=" height: 335px;">
                                    <div class="card-content" style="height: 300px;">
                                        <img src="images/not_found.png" alt="test" height="50" style="height: 260px;">
                                        <a href="#">video 2</a>
                                        <a class="btn-floating btn-large waves-effect waves-light red" style="float: right;">+</a>
                                    </div>
                                </div>
                            </div>

                            <div class="col s3 container">
                                <div class="card" style=" height: 335px;">
                                    <div class="card-content" style="height: 300px;">
                                        <img src="images/not_found.png" alt="test" height="50" style="height: 260px;">
                                        <a href="#">video 3</a>
                                        <a class="btn-floating btn-large waves-effect waves-light red" style="float: right;">+</a>
                                    </div>
                                </div>
                            </div>

                            <div class="col s3 container">
                                <div class="card" style=" height: 335px;">
                                    <div class="card-content" style="height: 300px;">
                                        <img src="images/not_found.png" alt="test" height="50" style="height: 260px;">
                                        <a href="#">video 4</a>
                                        <a class="btn-floating btn-large waves-effect waves-light red" style="float: right;">+</a>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </main>
        </div>
    </div>


    <script>
        
        (function()
        {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", "http://localhost:8080/app")
            xhr.send() 

            xhr.onreadystatechange = function()
            {
                if(this.readyState == this.DONE && this.status == 200 )
                {
                    if(this.responseText != 1)
                    {
                        console.log('session available ' + this.responseText)
                        document.getElementById('changeHere').innerHTML += '<button class=`btn waves-effect waves-light red darken-3` type=`submit` name=`action` style=`height: 3rem;margin-bottom: 6px; margin-left: 320px;`  onclick=`signUserOut();`>Logout</button>'
                        document.getElementById('playListItem').style.display = 'block';
                    }
                    else
                    {
                        console.log('session inavailable ' + this.responseText)
                        document.getElementById('changeHere').innerHTML += '<button class="btn waves-effect waves-light red darken-3" type="submit" name="action" style="height: 3rem;margin-bottom: 6px; margin-left: 320px;" onclick="location.href=`/loginPage`">Login</button>'
                        document.getElementById('playListItem').style.display = 'none';
                    }
                }
            }
        })()

    </script>


    <!-- <script src="Script1.js"></script> -->
    <script src="Script.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>

</body>

</html>