var db = null
var pageData = []

window.onload = function() {
	init(getData, initTable)
}

function getData(db, initTable) {
	var tx = db.transaction('paper', 'readonly')
	var objectStore  = tx.objectStore('paper')
	var request = objectStore.openCursor()
	request.onsuccess = function(e) {
		var cursor = e.target.result
		if (cursor) {
			// console.log(cursor.value)
			var id = cursor.value.id
			cursor.value.operation = "<button onclick='edit("+id+")'>修改</button><button onclick='del("+id+")'>删除</button>"
			pageData.push(cursor.value)
			cursor.continue()
		} else {
			initTable(pageData)
			console.log("检索结束")
		}
	}
	request.onerror = function(e) {
		console.log("检索失败")
	}
}

function initTable(pageData) {
	console.log(pageData)
	$('#dataTable').bootstrapTable({
		striped: true,
		search: true,
		pagination: true,
		pageSize: 10,
		pageList: [10, 25, 50, 100],
		columns: [{
			field: 'title',
			title: '论文题目'
		}, {
			field: 'teacher',
			title: '指导老师'
		}, {
			field: 'type',
			title: '论文性质'
		}, {
			field: 'number',
			title: '限选人数'
		}, {
			field: 'releaseTime',
			title: '发布时间'
		}, {
			field: 'status',
			title: '状态'
		}, {
			field: 'operation',
			title: '操作'
		}],
		data: pageData
	})
	console.log("table加载完成")
}

function init(getData, initTable) {
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
		getData(e.target.result, initTable)
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

function edit(id) {
	window.location = "./edit.html?id="+id;
}

function del(id) {
	if (confirm("确定要删除该论文选题吗？")) {
		var tx = db.transaction("paper", "readwrite")
		var objectStore = tx.objectStore("paper")
		objectStore.delete(id)
		tx.oncomplete = function() {
			alert("删除成功")
			window.location = "./index.html"
		}
		tx.onabort = function() {
			alert("删除失败")
		}
	} else {

	}
}

function add() {
	window.location = "./release.html"
}
