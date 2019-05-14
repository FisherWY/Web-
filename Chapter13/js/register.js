function regist() {
	var username = document.getElementById('user')
	var password = document.getElementById('password')
	var sex = document.getElementsByTagName('sex')
	var sex0 = document.getElementById('sex0')
	var sex1 = document.getElementById('sex1')
	var age = document.getElementById('age')
	var professer = document.getElementById('professer')

	localStorage.user = username.value
	localStorage.psw = password.value
	if (sex0.checked) {
		localStorage.sex = "男"
	} else if (sex1.checked) {
		localStorage.sex = "女"
	} else {
		localStorage.sex = "未知"
	}
	localStorage.age = age.value
	localStorage.professer = professer.value

	alert("注册成功")
	window.location = "./login.html"
}