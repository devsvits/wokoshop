function hideAllforms()
{
	$('#overlay').fadeIn(1000);
	$("#vpb_reset_password_box").hide();
	$("#vpb_open_signup_box").hide();
	$("#vpb_users_login_box").hide();
	$("#vpb_open_guestco_box").hide();
	$("#vpb_order_checkout_box").hide();
	$("#vpb_change_password_box").hide();
	$("#vpb_change_password_box_done").hide();
}

function closeAllForms ()
{
	$('#overlay').fadeOut('fast');
	$("#vpb_reset_password_box").hide();
	$("#vpb_open_signup_box").hide();
	$("#vpb_users_login_box").hide();
	$("#vpb_open_guestco_box").hide();
	$("#vpb_order_checkout_box").hide();
	$("#vpb_change_password_box").hide();
	$("#vpb_change_password_box_done").hide();
	$("#vpb_order_completed_box").hide();
	$("#shop-cart").hide();
}


//Open Login Box
function vpb_open_login_box() 
{
	hideAllforms()
	
	$('#vpb_users_login_box').slideDown('slow', function () {
	 
	});

	$("#login_status").html('');
}



//Open Forgot Password Box
function vpb_open_reset_password_box() 
{
	hideAllforms()
	$('#vpb_reset_password_box').slideDown('slow', function () {
     
	});
	$("#reset_password_status").html('');
}

//Open Sign-Up Box
function vpb_open_signup_box() 
{
	hideAllforms()
	$('#vpb_open_signup_box').slideDown('slow', function () {
     
	});
	
	$("#signup_status").html('');
}

function vpb_open_shopping_cart() 
{
	$('#overlay').fadeIn(1000);
	$("#shop-cart").fadeIn();
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
		var dataString = "Type=LOGIN"+'&username=' + username + '&passwd=' + passwd + '&login_type=' + login_type;// normal login and checkout login
		$.ajax({
			type: "GET",
			//url: "vpb_save_details.php",
			url: "/cgi-bin/operations.pl",
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
			var response_brought = response.indexOf('logout_process_completed_successfully=yes');
			response = response.replace("logout_process_completed_successfully=yes", "");
			
			if (response_brought != -1) 
			{
				$("#top_login").html("LOGIN");
				$("#customer_screen").hide();
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
		
	$('#profileInfo').hide();
	loadDefaultCategory();
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
		return;
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
		
		$('#vpb_open_guestco_box').hide();
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

function loadCategories()
{
	$.ajax( 
	{
		url: "cgi-bin/getBrands.pl",
		type: "GET",
		dataType: "html", //expect json to be returned
		data: "Type=CATEGORYLIST",
		
		cache: false,
		error: function(XMLHttpRequest, textStatus, errorThrown) 
		{ 
			alert (response);
		},
		success : function(response)
		{
			$("div#categoryProducts").html(response ); 
			$('div#categoryProducts').fadeIn(1000);
			
			loadDefaultCategory();
		}
	});
}

function loadDefaultCategory()
{
	$.ajax( 
	{
		url: "cgi-bin/getproduct.pl",
		type: "GET",
		dataType: "html", //expect json to be returned
		data: "category_id=5&Type=GetProductsForCategory",  // send category id as parameters to the Perl script
		cache: false,
		
		success : function(response)
		{
			$("#loading").html('');
			$("div#categoryProducts").append(response);
		}
	});
}


jQuery(document).ready(function($) 
{
	$('#profileInfo').hide();
	$("#customer_screen").hide();
	loadCategories();
	
	
	

	$('body').on( 'click', '.filter-by-subcategory', function () 
	{
	
		
		$('.brands-container').remove();
		
		//alert ($(this).attr('id'));
		$('.filter-by-subcategory').removeClass("mark");
		var subCategoryNameSelected = $(this).text().trim().split(' (')[0];
		
		//alert(url.split('?')[0]);
		//alert (subCategoryNameSelected);
		$("#temp").val(subCategoryNameSelected);
		var subcat_id = $(this).attr('id');
		//alert (cat_id);
		$(this).addClass("mark");
		
		var products = $('.product-container');
		$('.product-container')
			.hide()
			.filter(function () {
				return $(this).data('subcategory') == subCategoryNameSelected;
			})
			.show();
		
		//alert ($("#shop-by-brand-active").val());
		if ($("#shop-by-brand-active").val() === 'false')
		{
			//alert ("here");
			$.ajax( 
			{
				url: "cgi-bin/getBrands.pl",
				type: "GET",
				dataType: "html", //expect json to be returned
				data: "Type=GETSUBCATEGORYBRANDS" + "&sub_category_id=" + subcat_id,  // send sub category id as parameters to the Perl script
				cache: false,
				error: function(XMLHttpRequest, textStatus, errorThrown) 
				{ 
					alert ("script error");
				},
	
				success : function(response)
				{
					$(".brands-container").html(response ); 
				}
			});
			
			$( this ).after( "<li class='brands-container' style='height:auto; width:280px;'>	</li>");
		}
	});
	
	$('body').on( 'click', '.filter-by-brand', function () 
	{
		$('.filter-by-brand').removeClass("selected");
		var subCategoryNameSelected = $("#temp").val();
		var brandNameSelected = $(this).text().trim().split(' (')[0];
		//alert (brandNameSelected);
		//$(this).addClass("selected");
						
		if ($("#temp").val()==='')
		{	var products = $('.product-container');
			products.hide()
			.filter(function () {
				return $(this).data('brand') == brandNameSelected;
			})
			.show();
		}
		else
		{
			var products = $('.product-container');
			products.hide()
			.filter(function () {
				return $(this).data('subcategory') == subCategoryNameSelected;
			})
			.filter(function () {
				return $(this).data('brand') == brandNameSelected;
			})
			.show();
		}
	});
	
	$('body').on( 'click', '.filter-by-brand-list', function () 
	{
		$('.filter-by-brand-list').removeClass("selected");
		var brandId = (this).id;
		//var brandId = '47';
		var brandNameSelected = $(this).text().trim().split(' (')[0];
		//alert (brandNameSelected);
		$(this).addClass("selected");
		var brands = $('.brands-list-container');
		
		$.ajax( 
		{
			url: "cgi-bin/getproduct.pl",
			type: "GET",
			dataType: "html", //expect json to be returned
			data: "brand_id=" + brandId + "&Type=GetProductsForBrand",  // send category id as parameters to the Perl script
			cache: false,
			beforeSend: function() 
			{
				$("#loading").html('<br><br><div class="left"><font style="font-family:Verdana, Geneva, sans-serif; font-size:15px; color:black;">Please wait</font> <img src="images/loadings.gif" alt="Loading...." align="absmiddle" title="Loading...."/></div><br>');
			},

			error: function(XMLHttpRequest, textStatus, errorThrown) 
			{ 
				$('div#categoryProducts').text("responseText: " + XMLHttpRequest.responseText + ", textStatus: " + textStatus + ", errorThrown: " + errorThrown);
				$('div#categoryProducts').addClass("error");
				alert ("script error");
			}, // error 

			success : function(response)
			{
				$("#loading").html('');
				$("div#categoryProducts").html(response ); 
				$("div#categoryProducts").before(brands); 
			}
		});
	});
	
	
	$('body').on( 'click', '#shop_by_brands', function () 
	{
		
		$('.super-categories-container').remove();
		$('.brands-list-container').remove();
		$("div#categoryProducts").html('');
		$("#shop-by-brand-active").val('true');
		$('.topcat').css({"backgroundColor": "", "color": "", "border": ""});
		$(this).css({"backgroundColor": "black", "color": "white", "border": "5px solid #ccc"});
		
		$.ajax( 
		{
			url: "cgi-bin/getBrands.pl",
			type: "GET",
			dataType: "html", //expect json to be returned
			data: "Type=BRANDSLIST",
			cache: false,
			beforeSend: function() 
			{
				$("#loading").html('<br><br><div class="left"><font style="font-family:Verdana, Geneva, sans-serif; font-size:15px; color:black;">Please wait</font> <img src="images/loadings.gif" alt="Loading...." align="absmiddle" title="Loading...."/></div><br>');
			},

			error: function(XMLHttpRequest, textStatus, errorThrown) 
			{ 
				$('div#categoryProducts').text("responseText: " + XMLHttpRequest.responseText + ", textStatus: " + textStatus + ", errorThrown: " + errorThrown);
				$('div#categoryProducts').addClass("error");
				alert ("script error");
			}, // error 

			success : function(response)
			{
				$("#loading").html('');
				$("div#categoryProducts").html(response); 
			}
		});

		return false;
	});
			
	$('body').on('change', '.select_choose_variant', function() 
	{
		//alert( this.id);
		//alert (this.value);
		var select_id = this.id;
		var product_id = select_id.replace("select_","");
		//alert (product_id);
		  
		var variant_id = this.value.replace(/^.+_/,'');
		//alert (variant_id );
		$.ajax(
		{
			url: "/cgi-bin/get_price.pl",
			type: "GET",
			dataType: "json", //expect json to be returned
			data: "product_id=" + product_id +"&variant_id="+variant_id ,
			cache: false,
			
			error: function(XMLHttpRequest, textStatus, errorThrown) 
			{ 
				
				alert("responseText: " + XMLHttpRequest.responseText + ", textStatus: " + textStatus + ", errorThrown: " + errorThrown);					
				alert ("script error");
			}, // error 
					
			success: function(response)
			{
				//alert ("success");
					
				//	<strike>  $data[2]  </strike> &nbsp;&nbsp;	$data[3]
				$("#span_"+product_id).html("<strike>" + response.mrp_price + "</strike>" + "&nbsp;&nbsp;" + response.sell_price);
				
				//alert (response.image);
				$('#productImageWrapID_'+product_id +' img').attr("src", "../images/rice.png");
				
				//$("#productImageWrapID_"+24 "img").attr("src", response.image);
				
				
				//$("#last_"+id).html(address);
				//$(".editbox").hide();
				//$(".text").show();
			}
		});
	});

	$('body').on('click', '.btn_add_to_cart', function()
	{
		var select_id = $(this).attr('id');
		var product_id = select_id.replace("featuredProduct_","");
		var variant_id = $("#select_"+product_id).val();
		variant_id = variant_id.substring(variant_id.indexOf("_") + 1);
		$.ajax(
		{
			url: "/cgi-bin/get_price2.pl",
			contentType: "application/json; charset=utf-8",
			type: "GET",
			dataType: "json", //expect json to be returned
			data: "product_id=" + product_id +"&variant_id="+variant_id ,
			cache: false,
				
			error: function(XMLHttpRequest, textStatus, errorThrown) 
			{ 
				alert ("error");
				alert("responseText: " + XMLHttpRequest.responseText + ", textStatus: " + textStatus + ", errorThrown: " + errorThrown);					alert ("script error");
			}, // error 
						
			success: function(response)
			{
				if (simpleCart.add('name=' + response.variant_name, 'price=' + response.mrp_price, 'image=' + response.image_path, 'sell_price=' + response.sell_price ))
				{
					adjust_menu(select_id);
				}
			}
	});
	return false;
});



$("#CustomerInformation").on('click', '.varient_change', function () 
{
	var varient_id = this.id;
	alert (varient_id);
	varient_id = varient_id.replace("varient_change_" , "");
	//$("#first_"+varient_id).hide();
	$("#last_"+varient_id).hide();
	//$("#first_input_"+varient_id).show();
	$("#last_input_"+varient_id).show();
	$("#last_input_"+varient_id).focus();
});
	
$("#CustomerInformation").on('change', '.edit_td', function () 
{
	var id = $(this).attr('id');
	//alert (id);
	var address = $("#last_input_"+id).val();
	alert (address);
	//alert ("here");
	/*var varient_id =$(this).attr('id');
	//var product_id = $('#dummy').val(); 
	//var mrp = $("#first_input_"+varient_id).val();
	//var sell_price = $("#last_input_"+varient_id).val();*/
	alert (id);
			
	if( address != "")
	{
		$.ajax(
		{
			url: "/cgi-bin/updateAddress.pl",
			type: "GET",
			dataType: "html", //expect json to be returned
			data: "address=" + address +"&cus_id="+id,
			cache: false,
			
			error: function(XMLHttpRequest, textStatus, errorThrown) 
			{ 
				alert("responseText: " + XMLHttpRequest.responseText + ", textStatus: " + textStatus + ", errorThrown: " + errorThrown);					alert ("script error");
			}, // error 
					
			success: function(response)
			{
				$("#last_"+id).html(address);
				$(".editbox").hide();
				$(".text").show();
			}
		});
	}
	else
	{
		alert("Enter something.");
	}
});


		
$.ajax(
{
	type: "GET",
	url: "cgi-bin/checkout.pl",
	dataType: "html",
	cache: false,
	success: function(response)
	{
		var parsedObject = JSON.parse(response);
		if (parsedObject.user_logged_in === "yes") 
		{
			$("#top_login").html(parsedObject.name.toUpperCase() + "  " + "&#x25BC;" );
		}
	},
		
	error: function(XMLHttpRequest, textStatus, errorThrown) 
	{ 
		alert ("Login Check :error");
	}
	
});
});

$(document).keyup(function(e) 
{
if (e.keyCode == 27) 
{
	closeAllForms ();
}
});




function adjust_menu(id) 
{
	var productIDValSplitter 	= (id).split("_");
	var productIDVal 			= productIDValSplitter[1];
	var productX 		= $("#productImageWrapID_" + productIDVal).offset().left;
	var productY 		= $("#productImageWrapID_" + productIDVal).offset().top;
	
	var basketX 		= 600;
	var basketY 		= 800;
	
	var gotoX 			= basketX - productX;
	var gotoY 			= basketY - productY;
	
	var newImageWidth 	= $("#productImageWrapID_" + productIDVal).width() / 2;
	var newImageHeight	= $("#productImageWrapID_" + productIDVal).height() / 2;
	
	$("#productImageWrapID_" +  productIDVal + " img")
	.clone()
	.prependTo("#productImageWrapID_" + productIDVal )
	.css({'position' : 'absolute'}, {'z-index'  : '999'})
	.animate({opacity: 0.5, marginLeft: gotoX, marginTop: gotoY, width: newImageWidth, height: newImageHeight}, 1000, function() {$(this).remove();});
}



	
jQuery(document).ready(function($) 
{

	$("#top_login").mouseenter(function(){
		$(this).css("color","#FFFFFF");
	});
	
	$("#top_login").mouseleave(function(){
		$(this).css("color","#C0C0C0");
	});
	
	$(".abc").mouseenter(function(){
		$(this).css("background-color","#FFFFFF");
	});
	
	$(".abc").mouseleave(function(){
		$(this).css("background-color","");
	});
			
	
	$("#top_login").click(function(){
		$(this).css("color","#FFFFFF");
		var current_text = $(this).text().trim();
		if (current_text === 'LOGIN')
		{
			vpb_open_login_box();
		}
		else
		{	$("#customer_screen").toggle();
			//alert ('Need to display logout screen here');
		}
	});

	$('body').on('mouseenter', '.product-container', function() {
		$(this).css("background-color","#FFFF99");
	});

	$('body').on('mouseleave', '.product-container', function() {
		$(this).css("background-color","white");
	});
	
	
	$('#goTop').click(function() 
	{
		$('html, body').animate({scrollTop:0}, 'slow');
		return false;
	});
	
	$('#shopping-cart').click(function ()
	{
		vpb_open_shopping_cart();
	});

	$(window).scroll(function() 
	{
		if($(this).scrollTop() > 100)
		{
				$('#goTop').stop().animate({top: '550px' }, 500);
		}
		else
		{
				$('#goTop').stop().animate({top: '800px' }, 500);
		}
	});

	$(".editbox").mouseup(function() 
	{
		return false
	});

	// Outside click action
	$(document).mouseup(function()
	{
		//alert ("reachin............... here");
		$(".editbox").hide();
		$(".text").show();
	});

	$('.formclose').click(function()
	{
		closeAllForms ();
	});	

	$('.formclose-password_reset').click(function()
	{
		$("#vpb_reset_password_box").hide();
	});	
	
	var x = 0;
	var y = 0;
		
	$('body').on('click', '.topcat', function() 
	{
	
		if (x == 0)
		{
			$('.topcat').next().slideUp(500, function () {
			
			});
			$('.cat').next().slideUp(500, function () {
			
			});
			
			
			x = 1;
		}
		
		//e.preventDefault();
		$this = $(this);
		
		
		$('.cat').next().slideUp(500);
		$('input:checkbox').removeAttr('checked');
		$('.cat').removeClass("selected");
		$('.topcat').removeClass("selectedtopcat");
		$('.topcat').next().slideUp(500);
		$(this).addClass("selectedtopcat");
		
		$this.find(':radio').prop('checked', true);
		
		var top = $('.top-container');
		($this).next().slideToggle(500, function () {
			
			//$(slideSelector).slideDown(500);
			//execute this after slideToggle is done
			//change text of header based on visibility of content div
        
		});
		
		
		
		
		$("#customer_screen").hide();
		$('#profileInfo').hide();
		$('#products').show();	
		$('.brands-list-container').remove();
		$("#shop-by-brand-active").val('false');
		//$("div#categoryProducts2").html('');
		$("#temp").val('');
		var cat_id = $(this).attr('id'); // get category id
		//var top = $('.top-container');
		//alert (cat_id);
		
		
		$.ajax( 
		{
			url: "cgi-bin/checkIsSuperCategory.pl",
			type: "GET",
			dataType: "html", //expect json to be returned
			data: "category_id=" + cat_id,  // send category id as parameters to the Perl script
			cache: false,
			
			error: function(XMLHttpRequest, textStatus, errorThrown) 
			{
				alert ("script error");
			},

			success : function(response)
			{
				if (response === 'no')
				{
					$.ajax( 
					{
						url: "cgi-bin/getproduct.pl",
						type: "GET",
						dataType: "html", //expect json to be returned
						data: "category_id=" + cat_id + "&Type=GetProductsForCategory",  // send category id as parameters to the Perl script
						cache: false,
						error: function(XMLHttpRequest, textStatus, errorThrown) 
						{ 
							alert ("script error");
						},
			
						success : function(response)
						{
							$("#loading").html('');
							$("div#categoryProducts").html(response); 
							$("div#categoryProducts").before(top);
						}
					});
				}
			}
			
			
		});
		
		return false;
	});

	
	
	$('body').on('click', '.cat', function() 
	{
		
		$('.filter-by-subcategory').removeClass("selected");
		$this = $(this);
		
		
		
		$('.cat').next().slideUp(500, function () {
			$('input:checkbox').removeAttr('checked');
		});
		
		($this).next().slideToggle(500, function () {
			
			$this.find(':checkbox').prop('checked', true);
			
		});
		
		
		
			
		//alert('Devesh');
		$("#shop-by-brand-active").val('false');
		$("#temp").val('');
		$('.cat').removeClass("mark");
		$(this).addClass("mark");
		($this).next().addClass("selected");
		var cat_id = $(this).attr('id'); // get category id
		var top = $('.top-container');
		
		
		$.ajax( 
		{
			url: "cgi-bin/getproduct.pl",
			type: "GET",
			dataType: "html", //expect json to be returned
			data: "category_id=" + cat_id + "&Type=GetProductsForCategory",  // send category id as parameters to the Perl script
			cache: false,
			beforeSend: function() 
			{
				$("#loading").html('<br><br><div class="left"><font style="font-family:Verdana, Geneva, sans-serif; font-size:15px; color:black;">Please wait</font> <img src="images/loadings.gif" alt="Loading...." align="absmiddle" title="Loading...."/></div><br>');
			},

			error: function(XMLHttpRequest, textStatus, errorThrown) 
			{ 
				alert ("script error");
			},

			success : function(response)
			{
				$("#loading").html('');
				$("div#categoryProducts").html(response); 
			}
		});
		
		$("div#categoryProducts").before(top);
		
		return false;
	});
	
	
});