var db = null

window.onload = function() {
	db = init()
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

function init() {
	var indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB
	var dbName = "paper"
	var dbVersion = 1
	var storeName = "paper"

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
	}

	var tx = db.transaction("paper", "readwrite")
	var objectStore = tx.objectStore("paper")
	objectStore.add(data)
	tx.oncomplete = function() {
		alert("添加成功")
		window.location = "./index.html"
	}
	tx.onabort = function() {
		alert("添加失败")
	}
	
	reset()
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