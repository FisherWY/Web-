var db = null
var id = null

window.onload = function() {
	// 获得当前url的传参
	var url = window.location.search;
	// 将参数解析
	var args = url.substring(1, url.length).split("&");
	id = args[0].split("=")[1]

	db = init(search, args[0])
}

function search(db, id) {
	var title = document.getElementById('paper-title')
	var text = document.getElementById('paper-text')
	var type = document.getElementById('paper-type')
	var number = document.getElementById('paper-number')

	var tx = db.transaction('paper', 'readonly')
	var objectStore  = tx.objectStore('paper')
	// var result = objectStore.get(id.split("=")[1])
	// result.onsuccess = function(e) {
	// 	console.log(e)
	// 	console.log(result)
	// 	title.value = result.value.title
	// 	text.value = result.value.text
	// 	type.value = result.value.type
	// 	changeRadio(result.value.type)
	// 	number.value = result.value.number
	// }
	var request = objectStore.openCursor()
	request.onsuccess = function(e) {
		var cursor = e.target.result
		if (cursor) {
			console.log(cursor.value)
			if (cursor.value.id == id.split("=")[1]) {
				title.value = cursor.value.title
				text.value = cursor.value.text
				type.value = cursor.value.type
				changeRadio(cursor.value.type)
				number.value = cursor.value.number
				return;
			}
			cursor.continue()
		} else {
			console.log("检索结束")
		}
	}
	request.onerror = function(e) {
		console.log("检索失败")
	}
}

// 更改论文内容类型
function changeType(type) {
	var typeValue = document.getElementById('paper-type')
	switch(type) {
		case 0:
			typeValue.value = "软件开发"
			break;
		case 1:
			typeValue.value = "结合科研"
			break;
		case 2:
			typeValue.value = "工程设计"
			break;
		case 3:
			typeValue.value = "科学实验"
			break;
		default:
			typeValue.value = "NULL"
			break;
	}
}

function changeRadio(type) {
	var typeValue = document.getElementsByName('paper-type-radio')
	var value = null
	switch(type) {
		case "软件开发":
			value = 0
			break;
		case "结合科研":
			value = 1
			break;
		case "工程设计":
			value = 2
			break;
		case "科学实验":
			value = 3
			break;
		default:
			value = null
			break;
	}
	typeValue[value].checked = true
}

function init(search, id) {
	var indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB
	var dbName = "paper"
	var dbVersion = 1
	var storeName = "paper"

	/**
	 * 创建数据库连接
	**/
	var idb = indexedDB.open("paper", 1)
	// 连接成功回调
	idb.onsuccess = function(e) {
		db = e.target.result
		// 回调函数
		search(e.target.result, id)
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
				keyPath: "id",
				autoIncrement: true
			}
			var objectStore = db.createObjectStore(storeName, parameters)
		}
		console.log("数据库升级成功")
	}

	return db
}

// 提交论文
function submit() {
	var title = document.getElementById('paper-title')
	var text = document.getElementById('paper-text')
	var type = document.getElementById('paper-type')
	var number = document.getElementById('paper-number')

	if (title.value=="" || text.value=="" || type.value=="" || number.value=="") {
		alert("提交表单中不允许存在空值")
	}

	var data = {
		title: title.value,
		teacher: "彭丰平",
		type: type.value,
		number: number.value,
		releaseTime: new Date(),
		status: "已提交",
		text: text.value,
		id: parseInt(id)
	}

	var tx = db.transaction("paper", "readwrite")
	var objectStore = tx.objectStore("paper")
	objectStore.put(data)
	tx.oncomplete = function() {
		alert("修改成功")
		window.location = "index.html"
	}
	tx.onabort = function() {
		alert("修改失败")
	}

}

// 重置
function reset() {
	var title = document.getElementById('paper-title')
	var text = document.getElementById('paper-text')
	// var type = document.getElementById('paper-type')
	var number = document.getElementById('paper-number')

	title.value = ""
	text.value = ""
	// type.value = ""
	number.value = ""
}