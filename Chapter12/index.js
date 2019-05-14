window.onload = function() {
	var user = document.getElementById('user')
	var psw = document.getElementById('password')
	var remember = document.getElementById('remember')
	if (window.localStorage) {
		if (localStorage.user) {
			user.value = localStorage.user
		}
		if (localStorage.remember == "true") {
			remember.checked = true
			if (localStorage.psw) {
				psw.value = localStorage.psw
			}
		} else {
			remember.checked = false
		}
	}
}

function login() {
	var user = document.getElementById('user')
	var psw = document.getElementById('password')
	var remember = document.getElementById('remember')
	if (remember.checked == true) {
		localStorage.user = user.value
		localStorage.psw = psw.value
		localStorage.remember = remember.checked
		alert('登录成功')
	} else {
		localStorage.user = user.value
		localStorage.psw = ""
		localStorage.remember = remember.checked
		alert('登录成功')
	}
}

function clearpsw() {
	var psw = document.getElementById('password')
	psw.value = ""
	localStorage.psw = ""
}

function cleardata() {
	var user = document.getElementById('user')
	var psw = document.getElementById('password')
	var remember = document.getElementById('remember')
	user.value = ""
	psw.value = ""
	remember.checked = false
	localStorage.user = ""
	localStorage.psw = ""
	localStorage.remember = false
}