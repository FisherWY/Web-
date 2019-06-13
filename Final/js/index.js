window.onload = function() {
	console.log(sessionStorage.getItem("username"))
	if (sessionStorage.getItem("username") == "" || sessionStorage.getItem("username") == null) {
		alert("请先登录再畅游银黑部落")
		window.location = "./login.html"
	}
}

function exit() {
	window.location = "./login.html"
}

function viewDetail(pic, no) {
	window.location = "./news.html?pic=" + pic + "&no=" + no
}