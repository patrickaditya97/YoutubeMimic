<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>

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
    <!-- <script src="https://unpkg.com/axios/dist/axios.min.js"></script> -->

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
            display: none;
            margin-top: 100px;
        }

        .nav_mobile {
            display: none
        }
    </style>

    <title>Welcome</title>
</head>

<body>

	<%
		response.setHeader("Cache-Control","no-cache");
	  	response.setHeader("Cache-Control","no-store");
	  	response.setHeader("Pragma","no-cache");
	 	response.setDateHeader ("Expires", 0);
		
	 	HttpSession sess = request.getSession(false);
		if(sess.getAttribute("email") != null)
		{
			response.sendRedirect("/Home.html");
			
			System.out.println("at loginPage " + sess.getAttribute("email"));
		}
	%>

    <nav>
        <div class="nav-wrapper #212121 grey darken-4">
            <a href="/Home.html" class="brand-logo"><img src="images/YouTube1.png" alt="Logo" style="width: 45px;"></a>
        </div>
    </nav>

    <div>
        <div class="row">
            <div class="section"></div>
            <main>
                <div style="display: flex; justify-content: center; align-items: center; ">
                    <div id="login_body" class="grey darken-4 row"
                        style="padding: 32px 48px 0px 48px; border: 1px; margin-top: 90px; width: 400px;">

                        <div class="section" style="text-align: center;">
                            <img src="images/YouTube3.png" alt="Logo" style="width: 200px;">
                        </div>

                        <!-- <form action=""> -->

                        <div class='row' style="margin-bottom: 0;">
                            <div class='input-field col s12'>
                                <input class='validate' type="text" name='username' id='email' required />
                                <label for='email'>Username</label>
                            </div>
                        </div>

                        <div class='row'>
                            <div class='input-field col m12'>
                                <input class='validate' type='password' name='password' id='password' required />
                                <label for='password'>Password</label>
                            </div>
                            <label style='float: right;'>
                                    <a><b style="color: #F5F5F5;">Forgot Password?</b></a>
                            </label>
                        </div>

                        <br />

                        <div class='row' style="text-align: center;">
                            <button style="color: white; font-weight: 700; width: 60%; height: 40px;z-index: 0;" type='submit'
                                name='btn_login' class='btn-small waves-effect red accent-4 btn_login'>Login</button>
                        </div>


                        <!-- </form> -->

                        <div style="text-align: center; margin-bottom: 25px;">
                            <button class="oauth-container btn darken-4 white black-text g-signin2"
                                data-onsuccess="onSignIn" style="text-transform:none">
                            </button>
                        </div>

                    </div>
                </div>

            </main>
        </div>
    </div>

    <!-- <script src="Script1.js"></script> -->
    <script src="Script.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>

</body>

</html>