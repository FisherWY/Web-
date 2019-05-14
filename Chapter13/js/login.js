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

	if (user.value != localStorage.user) {
		alert("用户名不正确")
		return
	}

	if (psw.value != localStorage.psw) {
		alert("密码不正确")
		return
	}

	if (remember.checked == true) {
		localStorage.psw = psw.value
		localStorage.remember = remember.checked
		sessionStorage.token = "123"
		window.location = "./index.html"
	} else {
		localStorage.remember = remember.checked
		sessionStorage.token = "123"
		window.location = "./index.html"
	}
}

function clearpsw() {
	var psw = document.getElementById('password')
	psw.value = ""
	// localStorage.psw = ""
}