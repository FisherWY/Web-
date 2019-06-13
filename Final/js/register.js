var db = null

window.onload = function() {
	init()
}

function init() {
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

function register() {
	var uname = document.getElementById('inputEmail')
	var psw = document.getElementById('inputPassword')
	if (psw.value == "" || uname.value == "") {
		alert("用户名或密码不能为空")
		return
	}

	var data = {
		username: uname.value,
		password: psw.value
	}

	var tx = db.transaction("account", "readwrite")
	var objectStore = tx.objectStore("account")
	var res = objectStore.get(uname.value)

	res.onsuccess = function(e) {
		if (res.result == undefined) {
			console.log("没有找到已存在账号，可以注册")
			objectStore.add(data)

			console.log("注册成功，写入Session Storage，跳转到主页")
			sessionStorage.setItem("username", uname.value)
			window.location = "./index.html"
		} else {
			alert("该用户名已被注册，请另选用户名")
		}
	}
	res.onerror = function(e) {
		console.log(e)
	}
	res.oncomplete = function(e) {
		// console.log(e)
	}

}