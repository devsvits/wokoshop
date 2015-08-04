/*************************************************************
* Secure Forgot Password System Using Ajax, Jquery and PHP
* This script is brought to you by Vasplus Programming Blog
* Website: www.vasplus.info
* Email: info@vasplus.info
***************************************************************/


function signout()
{
	$.ajax({
			type: "GET",
			url: "cgi-bin/logout.pl",
			dataType: "html",
			cache: false,
			beforeSend: function() 
			{
				$("#signup_status").html('<br clea="all"><center><div class="center" style=""><font style="font-family:Verdana, Geneva, sans-serif; font-size:12px; color:black;">Please wait</font> <img src="images/loadings.gif" alt="Loading...." align="absmiddle" title="Loading...."/></div><center><br clea="all">');
			},
			success: function(response)
			{
				//alert (response);
				
				var response_brought = response.indexOf('logout_process_completed_successfully=yes');
				response = response.replace("logout_process_completed_successfully=yes", "");
				
				if (response_brought != -1) 
				{
					//alert ("User is logged out");
					$("#top_login").html("LOGIN");
					$("#customer_screen").hide();
					/*$("#top_logout").hide();
					$("#top_login").show();
					$("#top_signup").show();
					$("#top_forgot").show();
					$("#top_username").html("Hello Guest!");
					$('#fromwhere').val('1');*/
				}
				else
				{
					alert ("User is not logged out");
					$("#vpb_users_login_box").slideToggle();
					$("#signup_status").fadeIn(1000).html(response);
				}
			},
			
			error: function(XMLHttpRequest, textStatus, errorThrown) 
			{ 
				alert ("logout :error");
				$('#signup_status').fadeIn(1000).html(response);
			
			} // error
			
			
		});
}


//Open Login Box
function vpb_open_login_box() 
{
	$('#overlay').fadeIn(1000);
	$("#attendance_management_system").hide();
	$("#vpb_reset_password_box").hide();
	$("#vpb_open_signup_box").hide();
	$("#vpb_open_guestco_box").hide();
	$("#vpb_order_checkout_box").hide();
	$("#vpb_change_password_box").hide();
	$("#vpb_change_password_box_done").hide();
	
         $('#vpb_users_login_box').slideDown('slow', function () {
            //$('#overlay').fadeIn(1000);
            // Animation complete.
        });

    //$("#vpb_users_login_box").fadeIn();
	$("#login_status").html('');
}



//Open Forgot Password Box
function vpb_open_reset_password_box() 
{
	$('#overlay').fadeIn(1000);
	$("#attendance_management_system").hide();
	//$("#vpb_users_login_box").hide();
	$("#vpb_open_signup_box").hide();
	$("#vpb_order_checkout_box").hide();
	$("#vpb_change_password_box").hide();
	$("#vpb_change_password_box_done").hide();
	$("#vpb_reset_password_box").fadeIn();
	$("#reset_password_status").html('');
}

//Open Sign-Up Box
function vpb_open_signup_box() 
{
	$('#overlay').fadeIn(1000);
	$("#attendance_management_system").hide();
	$("#vpb_reset_password_box").hide();
	$("#vpb_users_login_box").hide();
	$("#vpb_order_checkout_box").hide();
	$("#vpb_change_password_box").hide();
	$("#vpb_change_password_box_done").hide();
	$("#vpb_open_signup_box").fadeIn();
	$("#signup_status").html('');
}

function vpb_users_guestco()
{
	//var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
	var mob = /[0-9]{10}/;
	var name = $("#gfullname").val();
	var address = $("#gaddress").val();
	var mobile = $("#gmobile").val();
	var city = $("#gcity").val();
	var del_date = $('#g_combo_date option:selected').val();
	var time_slot = $('input[name="g_time"]:checked').val();
	var payment_type = $('input[name="g_payment"]:checked').val();
	var email = " -";
	
	if(name == "")
	{
		$("#guestco_status").html('<div class="info">Please enter the fullname in the required field to proceed.</div>');
		$("#gfullname").focus();
	}
	
	else if(address == "")
	{
		$("#guestco_status").html('<div class="info">Please enter the address in the required field to proceed.</div>');
		$("#gaddress").focus();
	}
	
	else if(city == "--Select City--")
	{
		$("#guestco_status").html('<div class="info">Please select city to proceed.</div>');
		$("#gcity").focus();
	}
	
	else if(mobile == "")
	{
		$("#guestco_status").html('<div class="info">Please enter the mobile number in the required field to proceed.</div>');
		$("#gmobile").focus();
	}
	
	else if(mob.test(mobile) == false)
	{
		$("#guestco_status").html('<div class="info">Please enter a valid mobile number to proceed.</div>');
		$("#gmobile").focus();
	}
	else
	{
		
		var response = "<i>" + name + "<br>" + address + "<br> Mobile: +91-" + mobile + "<br> E-Mail: " + email + "</i>";
		$("#CustomerInformation").html(response);
		
		//$("#CustomerInformation").html(name + '<br>' + address + '<br>' + city + '<br>' + mobile);
		fill_dates();
		$("#vpb_order_checkout_box").show();
	}
}

//Change password process
function vpb_change_password()
{
	var username_reset = $("#username_reset").val();
	var new_password = $("#new_password").val();
	var verify_pass = $("#verify_pass").val();
	
	if(username_reset == "")
	{
		$("#change_password_status").html('<div class="info">Sorry, your username could not be verified any longer at the moment. Please refresh this page and try again. Thanks.</div>');
	}
	else if(new_password == "")
	{
		$("#change_password_status").html('<div class="info">Please enter your desired new password in the field provided above to proceed. Thanks.</div>');
		$("#new_password").focus();
	}
	else if(verify_pass == "")
	{
		$("#change_password_status").html('<div class="info">Please verify your provided new password to proceed. Thanks.</div>');
		$("#verify_pass").focus();
	}
	else if(verify_pass != new_password)
	{
		$("#change_password_status").html('<div class="info">Passwords did not match. Both New Password and Verify Password fields must be the same to proceed please. Thanks.</div>');
		$("#verify_pass").focus();
	}
	else
	{
		var dataString = 'username_reset=' + username_reset + '&new_password=' + new_password + '&page=vpb_change_password';
		$.ajax({
			type: "POST",
			url: "login.pl",
			data: dataString,
			cache: false,
			beforeSend: function() 
			{
				$("#change_password_status").html('<br clear="all"><br clear="all"><div align="left"><font style="font-family:Verdana, Geneva, sans-serif; font-size:15px; color:black;">Please wait</font> <img src="images/loadings.gif" alt="Loading...." align="absmiddle" title="Loading...."/></div><br clear="all">');
			},
			success: function(response)
			{
				var response_brought = response.indexOf("completed");
				if(response_brought != -1)
				{
					$("#change_password_status").html('');
					$("#vpb_change_password_box").hide();
					$("#vpb_change_password_box_done").fadeIn();
					$("#account_passwor_changeed_successfully").html(response);
				}
				else
				{
					$("#change_password_status").fadeIn(1000).html(response);
				}
			}
		});
	}
}



//Vaslidate Answer for password reset process
function vpb_reset_password_question_and_answer_devesh()
{
	var username_reset = $("#username_reset").val();
	var security_answer = $("#security_answer").val();
	
	if(username_reset == "")
	{
		$("#reset_password_qa_status").html('<div class="info">Sorry, your username could not be verified any longer at the moment. Please refresh this page and try again. Thanks.</div>');
	}
	else if(security_answer == "")
	{
		$("#reset_password_qa_status").html('<div class="info">Please enter your security answer in the required field to proceed.</div>');
		$("#security_answer").focus();
	}
	else
	{
		var dataString = 'username_reset=' + username_reset + '&security_answer=' + security_answer + '&page=vpb_reset_password_answer_validation';
		$.ajax({
			type: "POST",
			url: "login.pl",
			data: dataString,
			cache: false,
			beforeSend: function() 
			{
				$("#reset_password_qa_status").html('<br clear="all"><br clear="all"><div align="left"><font style="font-family:Verdana, Geneva, sans-serif; font-size:15px; color:black;">Please wait</font> <img src="images/loadings.gif" alt="Loading...." align="absmiddle" title="Loading...."/></div><br clear="all">');
			},
			success: function(response)
			{
				var response_brought = response.indexOf("validated");
				if(response_brought != -1)
				{
					$("#reset_password_qa_status").html('');
					$("#vpb_order_checkout_box").hide();
					$("#vpb_change_password_box").fadeIn();
					
					
				}
				else
				{
					$("#security_answer").val('').focus();
					$("#reset_password_qa_status").fadeIn(1000).html(response);
				}
			}
		});
	}
}

//Vaslidate Username for password reset process
function vpb_reset_password_username_validation()
{
	var username_reset = $("#username_reset").val();
	
	if(username_reset == "")
	{
		$("#reset_password_status").html('<div class="info">Please enter your account username in the required field to proceed.</div>');
		$("#username_reset").focus();
	}
	else
	{
		var dataString = 'username_reset=' + username_reset + '&page=vpb_reset_password_username_validation';
		$.ajax({
			
			type: "POST",
			url: "/cgi-bin/forgot_password.pl",
			data: dataString,
			dataType: "html",
			cache: false,
			beforeSend: function() 
			{
				$("#reset_password_status").html('<br clear="all"><br clear="all"><div align="left"><font style="font-family:Verdana, Geneva, sans-serif; font-size:15px; color:black;">Please wait</font> <img src="images/loadings.gif" alt="Loading...." align="absmiddle" title="Loading...."/></div><br clear="all">');
			},
			success: function(response)
			{
				var response_brought = response.indexOf("validated");
				if(response_brought != -1)
				{
					$("#reset_password_status").html('<div class="info"> Your new password is sent to your registered email address and phone. Please Log in with new password.  <span class="ccc"><a href="javascript:voi(0);" onclick="vpb_open_login_box();">click here</a></span> to return to login </div>');
					
				}
				else
				{
					$("#reset_password_status").fadeIn(1000).html(response);
				}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) 
			{ 
				alert ("forgot-password :error");
				$('#reset_password_status').fadeIn(1000).html(errorThrown);
			
			} // error
			
		});
	}
}



function fill_dates()
{
	$('#combo_date').empty();
	var monthNames = [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ];
	var dayNames= 	["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

	var newDate = new Date();
	newDate.setDate(newDate.getDate() );

	$('#combo_date').append($('<option></option>').val("-1").html("--Select Delivery Date--"));
	
	$('#combo_date').append($('<option></option>').val("0").html("Today"));
	$('#combo_date').append($('<option></option>').val("1").html("Tomorrow"));

	newDate.setDate(newDate.getDate() +2 );

	$('#combo_date').append($('<option></option>').val("2").html(newDate.getDate()+ 
	' ' + monthNames[newDate.getMonth()] + " - "+ dayNames[newDate.getDay()] 
	 ));


	newDate.setDate(newDate.getDate() +1 );

	$('#combo_date').append($('<option></option>').val("3").html(newDate.getDate()+ 
	' ' + monthNames[newDate.getMonth()] + " - "+ dayNames[newDate.getDay()] 
	 ));

	newDate.setDate(newDate.getDate() +1 );

	$('#combo_date').append($('<option></option>').val("4").html(newDate.getDate()+ 
	' ' + monthNames[newDate.getMonth()] + " - "+ dayNames[newDate.getDay()] 
	 ));

}



//Users Account Creation
function vpb_users_registration() 
{
	var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
	var mob = /[0-9]{10}/;
	var vpb_fullname = $("#sfullname").val();
	//var vpb_username = $("#susername").val();
	var vpb_email = $("#semail").val();
	var vpb_mobile = $("#smobile").val();
	
	var vpb_passwd = $("#spasswd").val();
	var vpb_address = $("#saddress").val();
	//var question = $("#squestion").val();
	//var answer = $("#sanswer").val();
	//alert (vpb_address );
	//alert (vpb_mobile );
	if(vpb_fullname == "")
	{
		$("#signup_status").html('<div class="info">Please enter the fullname in the required field to proceed.</div>');
		$("#sfullname").focus();
	}
	
	else if(vpb_address == "")
	{
		$("#signup_status").html('<div class="info">Please enter the address in the required field to proceed.</div>');
		$("#saddress").focus();
	}
	
	else if(vpb_mobile == "")
	{
		$("#signup_status").html('<div class="info">Please enter the mobile number in the required field to proceed.</div>');
		$("#smobile").focus();
	}
	
	else if(mob.test(vpb_mobile) == false)
	{
		$("#signup_status").html('<div class="info">Please enter a valid mobile number to proceed.</div>');
		$("#smobile").focus();
	}
	
	else if(vpb_email == "")
	{
		$("#signup_status").html('<div class="info">Please enter the email address to proceed.</div>');
		$("#semail").focus();
	}
	else if(reg.test(vpb_email) == false)
	{
		$("#signup_status").html('<div class="info">Please enter a valid email address to proceed.</div>');
		$("#semail").focus();
	}
	else if(vpb_passwd == "")
	{
		$("#signup_status").html('<div class="info">Please enter a desired password to proceed.</div>');
		$("#spasswd").focus();
	}
	
	else
	{
		var dataString = 'vpb_fullname='+ vpb_fullname + '&vpb_address=' + vpb_address+ '&vpb_mobile='+ vpb_mobile +'&email=' + vpb_email + '&passwd=' + vpb_passwd ;
		//alert (dataString);
		//+ '&question=' + question + '&answer=' + answer + '&page=users_registration';
		$.ajax({
			type: "POST",
			url: "/cgi-bin/signup.pl",
			data: dataString,
			dataType: "html",
			cache: false,
			beforeSend: function() 
			{
				$("#signup_status").html('<br clea="all"><center><div align="center" style=""><font style="font-family:Verdana, Geneva, sans-serif; font-size:12px; color:black;">Please wait</font> <img src="images/loadings.gif" alt="Loading...." align="absmiddle" title="Loading...."/></div><center><br clea="all">');
			},
			success: function(response)
			{
				//alert ("signup-success");
				//vpb_open_login_box();
					//$("#login_status").html(response);
				
				var returned_response = response.indexOf('completed');
				if(returned_response != -1)
				{
					$("#sfullname").val('');
					//$("#susername").val('');
					$("#semail").val('');
					$("#spasswd").val('');
					$("#sanswer").val('');
					$("#signup_status").html('');
					vpb_open_login_box();
					$("#login_status").html('<div class="info">Congrats <b>'+vpb_fullname+'</b>, you have registered successfully. <br>You may now login or reset your password to test the forgot password feature. Thanks.</div>');
				}
				else
				{
					$("#signup_status").fadeIn(1000).html(response);
				}
			},
			
			error: function(XMLHttpRequest, textStatus, errorThrown) 
			{ 
				alert ("signup :error");
				$('#signup_status').fadeIn(1000).html(response);
			
			} // error
			
			
		});
	}
}

//Users Login
function vpb_users_login() 
{
	var username = $("#username").val();
	var passwd = $("#passwd").val();
	var login_type = $("#fromwhere").val();
	
	if(username == "")
	{
		$("#login_status").html('<div class="info">Please enter your account email address to proceed.</div>');
		$("#username").focus();
	}
	else if(passwd == "")
	{
		$("#login_status").html('<div class="info">Please enter your account password to go.</div>');
		$("#passwd").focus();
	}
	else
	{
		var dataString = 'username=' + username + '&passwd=' + passwd + '&login_type=' + login_type;// normal login and checkout login
		$.ajax({
			type: "GET",
			//url: "vpb_save_details.php",
			url: "/cgi-bin/login.pl",
			data: dataString,
			dataType: "html",
			cache: false,
			beforeSend: function() 
			{
				$("#login_status").html('<br clear="all"><br clear="all"><div align="left"><font style="font-family:Verdana, Geneva, sans-serif; font-size:15px; color:black;">Please wait</font> <img src="images/loadings.gif" alt="Loading...." align="absmiddle" title="Loading...."/></div><br clear="all">');
			},
			success: function(response)
			{
				var parsedObject = JSON.parse(response)
				if (parsedObject.checkout_login_process_completed_successfully === 1) 
				{
					$("#login_status").html('');
					$("#vpb_users_login_box").hide();
					
					$("#top_login").html( parsedObject.name.toUpperCase() + "  " + "&#x25BC;" );
					$("#vpb_order_checkout_box").fadeIn();
					fill_dates();
					
					var response = "<i>" + parsedObject.name + "<br>" + parsedObject.address + "<br> Mobile: +91-" + parsedObject.mobile + "<br> E-Mail: " + parsedObject.email + "</i>";
					
					$("#CustomerInformation").html(response);
					$('#overlay').fadeOut('fast');
				}
				else if (parsedObject.normal_login_process_completed_successfully === 1) 
				{
					$("#login_status").html('');
					$("#vpb_users_login_box").hide();
					$("#top_login").html( parsedObject.name.toUpperCase() + "  " + "&#x25BC;" );
					$('#overlay').fadeOut('fast');
					
				}
				else if (parsedObject.login_process_failed === 1) 
				{
					$("#login_status").fadeIn(1000).html("<br><div class=\"info\">Sorry, you have provided incorrect information. Please enter correct user information to proceed. Thanks.</div><br>");
				}
				
			},
			
			error: function(XMLHttpRequest, textStatus, errorThrown) 
			{ 
				alert ("Login :error");
				$('#login_status').fadeIn(1000).html(response);
			
			} // error 
			
		});
	}
}