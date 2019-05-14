window.onload = function() {
	if (sessionStorage.token) {
		console.log("已登陆")
	} else {
		alert("请先登录再访问")
		window.location = "./login.html"
	}
}