var first_name = null
var last_name = null
var email = null
var birthday = null
var post_code = null
var sex = null

window.onload = function() {
	first_name = document.getElementById('First_Name')
	last_name = document.getElementById('Last_Name')
	email = document.getElementById('Email')
	birthday = document.getElementById('Birthday')
	post_code = document.getElementById('Post_Code')
	sex = document.getElementById('Sex')
}

function exit() {
	window.location = "./login.html"
}

function subscribe() {
	if (first_name.value=="" || last_name.value=="" || email.value=="") {
		alert("First_Name，Last_Name，Email均不能为空")
		return;
	}
	alert("恭喜" + email.value + "订阅成功！")
	first_name.value = ""
	last_name.value = ""
	email.value = ""
	birthday.value = ""
	post_code.value = ""
	sex.value = ""
}