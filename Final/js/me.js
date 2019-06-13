var db = null
var userinfo = null
var username = null
var inputFirstName = null
var inputLastName = null
var inputEmail = null
var inputBirthday = null
var inputZip = null
var inputSex = null
var inputOldPassword = null
var inputNewPassword = null
var username_h3 = null

window.onload = function() {
	inputFirstName = document.getElementById('inputFirstName')
	inputLastName = document.getElementById('inputLastName')
	inputEmail = document.getElementById('inputEmail')
	inputBirthday = document.getElementById('inputBirthday')
	inputZip = document.getElementById('inputZip')
	inputSex = document.getElementById('inputSex')
	inputOldPassword = document.getElementById('inputOldPassword')
	inputNewPassword = document.getElementById('inputNewPassword')
	username_h3 = document.getElementById('username_h3')
	init(initPage)
}

function initPage(mydb) {
	username = localStorage.getItem("username")
	var tx =  mydb.transaction("account", "readwrite")
	var objectStore = tx.objectStore("account")
	var res = objectStore.get(username)

	res.onsuccess = function(e) {
		console.log(e)
		var result = e.target.result
		userinfo = result
		if (result.firstname != undefined) {
			username_h3.innerHTML = result.firstname
			inputFirstName.value = result.firstname
		} else {
			username_h3.innerHTML = "暂无用户名"
		}
		if (result.lastname != undefined) {
			inputLastName.value = result.lastname
		}
		if (result.birthday != undefined) {
			inputBirthday.value = result.birthday
		}
		if (result.zipcode != undefined) {
			inputZip.value = result.zipcode
		}
		if (result.sex != undefined) {
			inputSex.value = result.sex
		}
		inputEmail.value = result.username
	}
	res.onerror = function(e) {
		console.log(e)
	}
	res.oncomplete = function(e) {
		console.log(e)
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

function exit() {
	window.location = "./login.html"
}

function updateInfo() {
	var data = {
		username: userinfo.username,
		password: userinfo.password,
		firstname: inputFirstName.value,
		lastname: inputLastName.value,
		birthday: inputBirthday.value,
		zipcode: inputZip.value,
		sex: inputSex.value
	}

	if (inputNewPassword.value != "") {
		if (inputOldPassword.value == userinfo.password) {
			data.password = inputNewPassword.value
			userinfo.password = inputNewPassword.value
		} else {
			alert("旧密码错误！")
			return;
		}
	}

	var tx = db.transaction("account", "readwrite")
	var objectStore = tx.objectStore("account")
	objectStore.put(data)
	alert("更新成功！")
	inputOldPassword.value = ""
	inputNewPassword.value = ""
}