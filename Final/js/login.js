var db = null
var username = null
var userpsw = null
var rememberme = null

window.onload = function() {
	username = document.getElementById('username')
	userpsw = document.getElementById('userpsw')
	rememberme = document.getElementById('rememberme')
	init(initPage)
}

function initPage(mydb) {
	if (localStorage.getItem("rememberme") == "true") {
		var tx = mydb.transaction("account", "readwrite")
		var objectStore = tx.objectStore("account")
		var res = objectStore.get(localStorage.getItem("username"))

		res.onsuccess = function(e) {
			console.log(res)
			console.log(e)
			username.value = res.result.username
			userpsw.value = res.result.password
			rememberme.checked = true
		}
		res.onerror = function(e) {
			console.log(e)
		}
		res.oncomplete = function(e) {
			// console.log(e)
		}
	}
}

function init(initPage) {
	var indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB
	var dbName = "Spurs"
	var dbVersion = 1
	var storeName = "account"

	/**
	 * 创建数据库连接
	**/
	var idb = indexedDB.open(dbName, 1)
	// 连接成功回调
	idb.onsuccess = function(e) {
		db = e.target.result
		initPage(e.target.result)
		// console.log(e)
		console.log("数据库连接成功")
	}
	// 连接失败回调
	idb.onerror = function(e) {
		console.log("数据库连接失败")
	}
	// 连接升级回调
	idb.onupgradeneeded = function(e) {
		db = e.target.result
		if (!db.objectStoreNames.contains(storeName)) {
			// 创建对象仓库
			var parameters = {
				keyPath: "username",
			}
			var objectStore = db.createObjectStore(storeName, parameters)
		}
		console.log("数据库升级成功")
	}
	return db
}

function toRegister() {
	window.location = "./register.html"
}

function iForgot() {
	alert("真忘记密码了？只能重新注册了。")
}

function login() {
	if (username.value == "" || userpsw.value == "") {
		alert("用户名或密码为空")
		return
	}

	var tx = db.transaction("account", "readwrite")
	var objectStore = tx.objectStore("account")
	var res = objectStore.get(username.value)

	res.onsuccess = function(e) {
		console.log(res)
		console.log(e)
		if (res.result == undefined) {
			alert("该用户不存在！")
			username.value = ""
			userpsw.value = ""
			return
		}
		if (res.result.username == username.value && res.result.password == userpsw.value) {
			if (rememberme.checked == true) {
				localStorage.setItem("username", username.value)
				localStorage.setItem("rememberme", true)
			} else {
				localStorage.setItem("username", "")
				localStorage.setItem("rememberme", false)
			}
			sessionStorage.setItem("username", username.value)
			window.location = "./index.html"
		} else {
			userpsw.value = ""
			alert("用户名或密码错误")
		}
	}
	res.onerror = function(e) {
		console.log(e)
	}
	res.oncomplete = function(e) {
		// console.log(e)
	}
}